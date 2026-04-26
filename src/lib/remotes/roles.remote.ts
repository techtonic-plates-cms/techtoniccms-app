import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';

export type PolicyRef = {
	id: string;
	name: string;
	actionType: string;
	effect: string;
	resourceType: string;
	description: string | null;
	assignedAt?: string | null;
	expiresAt?: string | null;
};

export type UserRef = {
	id: string;
	name: string;
	status: string;
	assignedAt?: string | null;
	expiresAt?: string | null;
};

export type Role = {
	id: string;
	name: string;
	description: string | null;
	creationTime: string | null;
	lastEditTime: string | null;
	policies: PolicyRef[];
	users: UserRef[];
};

const ROLES_QUERY = `
	query Roles($first: Int, $after: String, $search: String) {
		roles {
			roles(first: $first, after: $after, search: $search) {
				nodes {
					id name description creationTime
					policies { id name actionType effect resourceType }
					users { id name status }
				}
				pageInfo { hasNextPage endCursor }
			}
		}
	}
`;

const ROLE_QUERY = `
	query Role($id: UUID) {
		roles {
			role(id: $id) {
				id name description creationTime lastEditTime
				policies { id name actionType effect resourceType description assignedAt expiresAt }
				users { id name status assignedAt expiresAt }
			}
		}
	}
`;

const CREATE_ROLE_MUTATION = `
	mutation CreateRole($input: CreateRoleInput!) {
		roles { create(input: $input) { id name } }
	}
`;

const UPDATE_ROLE_MUTATION = `
	mutation UpdateRole($input: UpdateRoleInput!) {
		roles { update(input: $input) { id name } }
	}
`;

const DELETE_ROLE_MUTATION = `
	mutation DeleteRole($id: UUID!) {
		roles { delete(id: $id) }
	}
`;

const ASSIGN_POLICY_MUTATION = `
	mutation AssignPolicyToRole($input: AssignPolicyToRoleInput!) {
		roles { assignPolicy(input: $input) }
	}
`;

const UNASSIGN_POLICY_MUTATION = `
	mutation UnassignPolicyFromRole($policyId: UUID!, $roleId: UUID!) {
		roles { unassignPolicy(policyId: $policyId, roleId: $roleId) }
	}
`;

export const getRoles = query(
	v.object({
		search: v.optional(v.string()),
		after: v.optional(v.string())
	}),
	async ({ search, after }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<
			{
				roles: {
					roles: { nodes: Role[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } };
				};
			},
			Record<string, unknown>
		>(ROLES_QUERY, { first: 25, after, search }, { token: locals.accessToken?.tokenValue });
		return result.roles.roles ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
	}
);

export const getRole = query(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<{ roles: { role: Role | null } }, { id: string }>(
			ROLE_QUERY,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		return result.roles.role;
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
		const ids = policyIds ? policyIds.split(',').filter(Boolean) : [];
		const result = await gqlFetch<
			{ roles: { create: { id: string } } },
			{ input: Record<string, unknown> }
		>(
			CREATE_ROLE_MUTATION,
			{
				input: {
					name,
					description: description || undefined,
					policyIds: ids.length ? ids : undefined
				}
			},
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/roles/${result.roles.create.id}`);
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
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			UPDATE_ROLE_MUTATION,
			{ input: { id, name: name || undefined, description: description || undefined } },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/roles/${id}`);
	}
);

export const deleteRole = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { id: string }>(
			DELETE_ROLE_MUTATION,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, '/settings/roles');
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
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			ASSIGN_POLICY_MUTATION,
			{ input: { roleId, policyId, expiresAt: expiresAt || undefined } },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/roles/${roleId}`);
	}
);

export const unassignPolicyFromRole = form(
	v.object({
		roleId: v.pipe(v.string(), v.nonEmpty()),
		policyId: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ roleId, policyId }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { policyId: string; roleId: string }>(
			UNASSIGN_POLICY_MUTATION,
			{ policyId, roleId },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/roles/${roleId}`);
	}
);
