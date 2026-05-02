import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch, handleGraphQLError, handleGraphQLErrorForm } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';
import { graphql, UserStatus, type ActivateUserMutation, type ActivateUserMutationVariables, type AssignPolicyToUserMutation, type AssignPolicyToUserMutationVariables, type AssignRoleMutation, type AssignRoleMutationVariables, type ChangePasswordMutation, type ChangePasswordMutationVariables, type CreateUserMutation, type CreateUserMutationVariables, type DeactivateUserMutation, type DeactivateUserMutationVariables, type DeleteUserMutation, type DeleteUserMutationVariables, type UnassignPolicyFromUserMutation, type UnassignPolicyFromUserMutationVariables, type UnassignRoleMutation, type UnassignRoleMutationVariables, type UpdateUserMutation, type UpdateUserMutationVariables, type GetUserQuery, type GetUserQueryVariables, type GetUsersQuery, type GetUsersQueryVariables } from 'techtonic-client-gql';


const USERS_QUERY = graphql(`
	query GetUsers($first: Int, $after: String, $where: UserFilterInput) {
		users {
			users(first: $first, after: $after, where: $where) {
				nodes {
					id name status creationTime lastLoginTime lastEditTime
					roles { id role { id name } }
					policies { id assignedAt expiresAt reason policy { id name effect resourceType actionType } }
				}
				pageInfo { hasNextPage endCursor }
			}
		}
	}
`);

const USER_QUERY = graphql(`
	query GetUser($id: UUID) {
		users {
			user(id: $id) {
				id name status creationTime lastLoginTime lastEditTime
				roles { id role {id name} assignedAt expiresAt }
				policies { id assignedAt expiresAt reason policy { id name effect resourceType actionType } }
			}
		}
	}
`);

const CREATE_USER_MUTATION = graphql(`
	mutation CreateUser($input: CreateUserInput!) {
		users {
			create(input: $input) { id name }
		}
	}
`);

const UPDATE_USER_MUTATION = graphql(`
	mutation UpdateUser($input: UpdateUserInput!) {
		users {
			update(input: $input) { id name }
		}
	}
`);

const DELETE_USER_MUTATION = graphql(`
	mutation DeleteUser($id: UUID!) {
		users { delete(id: $id) }
	}
`);

const ASSIGN_ROLE_MUTATION = graphql(`
	mutation AssignRole($input: AssignRoleInput!) {
		users { assignRole(input: $input) }
	}
`);

const UNASSIGN_ROLE_MUTATION = graphql(`
	mutation UnassignRole($userId: UUID!, $roleId: UUID!) {
		users { unassignRole(userId: $userId, roleId: $roleId) }
	}
`);

const ACTIVATE_MUTATION = graphql(`
	mutation ActivateUser($id: UUID!) { users { activate(id: $id) { id status } } }
`);
const DEACTIVATE_MUTATION = graphql(`
	mutation DeactivateUser($id: UUID!) { users { deactivate(id: $id) { id status } } }
`);
const CHANGE_PASSWORD_MUTATION = graphql(`
	mutation ChangePassword($input: ChangePasswordInput!) {
		users { changePassword(input: $input) }
	}
`);

const ASSIGN_POLICY_MUTATION = graphql(`
	mutation AssignPolicyToUser($input: AssignPolicyToUserInput!) {
		users { assignPolicy(input: $input) }
	}
`);

const UNASSIGN_POLICY_MUTATION = graphql(`
	mutation UnassignPolicyFromUser($policyId: UUID!, $userId: UUID!) {
		users { unassignPolicy(policyId: $policyId, userId: $userId) }
	}
`);

export const getUsers = query(
	v.object({
		search: v.optional(v.string()),
		status: v.optional(v.string()),
		after: v.optional(v.string())
	}),
	async ({ search, status, after }) => {
		const { locals } = getRequestEvent();
		const where: Record<string, unknown> = {};
		if (search) where.name = { contains: search };
		if (status) where.status = { eq: status };
		try {
			const result = await gqlFetch<GetUsersQuery, GetUsersQueryVariables
			>(
				USERS_QUERY,
				{ first: 25, after, where: Object.keys(where).length > 0 ? where : undefined },
				{ token: locals.accessToken?.tokenValue }
			);
			return result.users.users ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const getUser = query(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<GetUserQuery, GetUserQueryVariables>(
				USER_QUERY,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			return result.users.user!;
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const createUser = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		_password: v.pipe(v.string(), v.nonEmpty('Password is required')),
		status: v.optional(v.enum(UserStatus)),
		roleIds: v.optional(v.string()),
		policyIds: v.optional(v.string())
	}),
	async ({ name, _password, status, roleIds, policyIds }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<CreateUserMutation, CreateUserMutationVariables
			>(
				CREATE_USER_MUTATION,
				{
					input: {
						name,
						password: _password,
						status: status || UserStatus.Active,
						roles: roleIds ? { ids: roleIds.split(',').filter(Boolean) } : undefined,
						policies: policyIds ? { ids: policyIds.split(',').filter(Boolean) } : undefined
					}
				},
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/users/${result.users.create.id}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const updateUser = form(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty()),
		name: v.optional(v.string()),
		status: v.optional(v.enum(UserStatus))
	}),
	async ({ id, name, status }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<UpdateUserMutation, UpdateUserMutationVariables>(
				UPDATE_USER_MUTATION,
				{ input: { id, name: name || undefined, status: status || undefined } },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/users/${id}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const deleteUser = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<DeleteUserMutation, DeleteUserMutationVariables>(
				DELETE_USER_MUTATION,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, '/settings/users');
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const assignRole = form(
	v.object({
		userId: v.pipe(v.string(), v.nonEmpty()),
		roleId: v.pipe(v.string(), v.nonEmpty()),
		expiresAt: v.optional(v.string())
	}),
	async ({ userId, roleId, expiresAt }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<AssignRoleMutation, AssignRoleMutationVariables>(
				ASSIGN_ROLE_MUTATION,
				{ input: { userId, roleId, expiresAt: expiresAt || undefined } },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/users/${userId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const unassignRole = form(
	v.object({
		userId: v.pipe(v.string(), v.nonEmpty()),
		roleId: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ userId, roleId }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<UnassignRoleMutation, UnassignRoleMutationVariables>(
				UNASSIGN_ROLE_MUTATION,
				{ userId, roleId },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/users/${userId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const activateUser = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<ActivateUserMutation, ActivateUserMutationVariables>(
				ACTIVATE_MUTATION,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/users/${id}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const deactivateUser = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<DeactivateUserMutation, DeactivateUserMutationVariables>(
				DEACTIVATE_MUTATION,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/users/${id}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const changePassword = form(
	v.object({
		userId: v.pipe(v.string(), v.nonEmpty()),
		_newPassword: v.pipe(v.string(), v.nonEmpty('New password is required'))
	}),
	async ({ userId, _newPassword }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<ChangePasswordMutation, ChangePasswordMutationVariables>(
				CHANGE_PASSWORD_MUTATION,
				{ input: { userId, newPassword: _newPassword } },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/users/${userId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const assignPolicyToUser = form(
	v.object({
		userId: v.pipe(v.string(), v.nonEmpty()),
		policyId: v.pipe(v.string(), v.nonEmpty()),
		expiresAt: v.optional(v.string())
	}),
	async ({ userId, policyId, expiresAt }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<AssignPolicyToUserMutation, AssignPolicyToUserMutationVariables>(
				ASSIGN_POLICY_MUTATION,
				{ input: { userId, policyId, expiresAt: expiresAt || undefined } },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/users/${userId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const unassignPolicyFromUser = form(
	v.object({
		userId: v.pipe(v.string(), v.nonEmpty()),
		policyId: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ userId, policyId }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<UnassignPolicyFromUserMutation, UnassignPolicyFromUserMutationVariables>(
				UNASSIGN_POLICY_MUTATION,
				{ policyId, userId },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/users/${userId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);
