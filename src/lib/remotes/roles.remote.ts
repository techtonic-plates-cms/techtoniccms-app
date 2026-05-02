import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch, handleGraphQLError, handleGraphQLErrorForm } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';
import { graphql, type AssignPolicyToRoleMutation, type AssignPolicyToRoleMutationVariables, type CreateRoleMutation, type CreateRoleMutationVariables, type GetRoleQuery, type GetRoleQueryVariables, type RolesForComboboxQuery, type RolesForComboboxQueryVariables, type GetRolesQuery, type GetRolesQueryVariables, type UnassignPolicyFromRoleMutation, type UnassignPolicyFromRoleMutationVariables, type UpdateRoleMutation, type UpdateRoleMutationVariables } from 'techtonic-client-gql';


const ROLES_QUERY = graphql(`
	query GetRoles($first: Int, $after: String, $where: RoleFilterInput) {
		roles {
			roles(first: $first, after: $after, where: $where) {
				nodes {
					id name description creationTime lastEditTime
					policies { id assignedAt expiresAt reason policy { id name actionType effect resourceType description } }
					users { id assignedAt expiresAt role { id name } }
				}
				pageInfo { hasNextPage endCursor }
			}
		}
	}
`);

const ROLE_QUERY = graphql(`
	query GetRole($id: UUID) {
		roles {
			role(id: $id) {
				id name description creationTime lastEditTime
				policies { id assignedAt expiresAt reason policy { id name actionType effect resourceType description } }
				users { id assignedAt expiresAt role { id name } }
			}
		}
	}
`);

const CREATE_ROLE_MUTATION = graphql(`
	mutation CreateRole($input: CreateRoleInput!) {
		roles { create(input: $input) { id name } }
	}
`);

const UPDATE_ROLE_MUTATION = graphql(`
	mutation UpdateRole($input: UpdateRoleInput!) {
		roles { update(input: $input) { id name } }
	}
`);

const DELETE_ROLE_MUTATION = graphql(`
	mutation DeleteRole($id: UUID!) {
		roles { delete(id: $id) }
	}
`);

const ASSIGN_POLICY_MUTATION = graphql(`
	mutation AssignPolicyToRole($input: AssignPolicyToRoleInput!) {
		roles { assignPolicy(input: $input) }
	}
`);

const UNASSIGN_POLICY_MUTATION = graphql(`
	mutation UnassignPolicyFromRole($policyId: UUID!, $roleId: UUID!) {
		roles { unassignPolicy(policyId: $policyId, roleId: $roleId) }
	}
`);

const ROLES_COMBOBOX_QUERY = graphql(`
	query RolesForCombobox($first: Int, $where: RoleFilterInput) {
		roles {
			roles(first: $first, where: $where) {
				nodes { id name description }
			}
		}
	}
`);

export const getRolesForCombobox = query(
	v.object({ search: v.optional(v.string()) }),
	async ({ search }) => {
		const { locals } = getRequestEvent();
		const where: Record<string, unknown> = {};
		if (search) where.name = { contains: search };
		try {
			const result = await gqlFetch<
				RolesForComboboxQuery, RolesForComboboxQueryVariables
			>(
				ROLES_COMBOBOX_QUERY,
				{ first: 20, where: Object.keys(where).length > 0 ? where : undefined },
				{ token: locals.accessToken?.tokenValue }
			);
			return result.roles.roles?.nodes ?? [];
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const getRoles = query(
	v.object({
		search: v.optional(v.string()),
		after: v.optional(v.string())
	}),
	async ({ search, after }) => {
		const { locals } = getRequestEvent();
		const where: Record<string, unknown> = {};
		if (search) where.name = { contains: search };
		try {
			const result = await gqlFetch<
				GetRolesQuery, GetRolesQueryVariables
			>(
				ROLES_QUERY,
				{ first: 25, after, where: Object.keys(where).length > 0 ? where : undefined },
				{ token: locals.accessToken?.tokenValue }
			);
			return result.roles.roles ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const getRole = query(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<GetRoleQuery, GetRoleQueryVariables>(
				ROLE_QUERY,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			return result.roles.role!;
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const createRole = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		description: v.optional(v.string()),
		policyIds: v.optional(v.string())
	}),
	async ({ name, description, policyIds }) => {
		const { locals } = getRequestEvent();
		try {
			const ids = policyIds ? policyIds.split(',').filter(Boolean) : [];
			const result = await gqlFetch<CreateRoleMutation, CreateRoleMutationVariables
			>(
				CREATE_ROLE_MUTATION,
				{
					input: {
						name,
						description: description || undefined,
						policies: ids.length ? { ids } : undefined
					}
				},
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/roles/${result.roles.create.id}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const updateRole = form(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty()),
		name: v.optional(v.string()),
		description: v.optional(v.string())
	}),
	async ({ id, name, description }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<UpdateRoleMutation, UpdateRoleMutationVariables>(
				UPDATE_ROLE_MUTATION,
				{ input: { id, name: name || undefined, description: description || undefined } },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/roles/${id}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const deleteRole = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<unknown, { id: string }>(
				DELETE_ROLE_MUTATION,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, '/settings/roles');
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const assignPolicyToRole = form(
	v.object({
		roleId: v.pipe(v.string(), v.nonEmpty()),
		policyId: v.pipe(v.string(), v.nonEmpty()),
		expiresAt: v.optional(v.string())
	}),
	async ({ roleId, policyId, expiresAt }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<AssignPolicyToRoleMutation, AssignPolicyToRoleMutationVariables>(
				ASSIGN_POLICY_MUTATION,
				{ input: { roleId, policyId, expiresAt: expiresAt || undefined } },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/roles/${roleId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const unassignPolicyFromRole = form(
	v.object({
		roleId: v.pipe(v.string(), v.nonEmpty()),
		policyId: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ roleId, policyId }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<UnassignPolicyFromRoleMutation, UnassignPolicyFromRoleMutationVariables>(
				UNASSIGN_POLICY_MUTATION,
				{ policyId, roleId },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/roles/${roleId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);
