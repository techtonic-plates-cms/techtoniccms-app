import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';

export type UserRole = {
	id: string;
	name: string;
	assignedAt?: string | null;
	expiresAt?: string | null;
};

export type UserPolicy = {
	id: string;
	name: string;
	effect: string;
	actionType: string;
	resourceType: string;
};

export type User = {
	id: string;
	name: string;
	status: 'ACTIVE' | 'INACTIVE';
	creationTime: string | null;
	lastLoginTime: string | null;
	lastEditTime: string | null;
	roles: UserRole[];
};

const USERS_QUERY = `
	query Users($first: Int, $after: String, $where: UserFilterInput) {
		users {
			users(first: $first, after: $after, where: $where) {
				nodes {
					id name status creationTime lastLoginTime
					roles { id name }
				}
				pageInfo { hasNextPage endCursor }
			}
		}
	}
`;

const USER_QUERY = `
	query User($id: UUID) {
		users {
			user(id: $id) {
				id name status creationTime lastLoginTime lastEditTime
				roles { id name assignedAt expiresAt }
			}
		}
	}
`;

const CREATE_USER_MUTATION = `
	mutation CreateUser($input: CreateUserInput!) {
		users {
			create(input: $input) { id name }
		}
	}
`;

const UPDATE_USER_MUTATION = `
	mutation UpdateUser($input: UpdateUserInput!) {
		users {
			update(input: $input) { id name }
		}
	}
`;

const DELETE_USER_MUTATION = `
	mutation DeleteUser($id: UUID!) {
		users { delete(id: $id) }
	}
`;

const ASSIGN_ROLE_MUTATION = `
	mutation AssignRole($input: AssignRoleInput!) {
		users { assignRole(input: $input) }
	}
`;

const UNASSIGN_ROLE_MUTATION = `
	mutation UnassignRole($userId: UUID!, $roleId: UUID!) {
		users { unassignRole(userId: $userId, roleId: $roleId) }
	}
`;

const ACTIVATE_MUTATION = `
	mutation ActivateUser($id: UUID!) { users { activate(id: $id) { id status } } }
`;
const DEACTIVATE_MUTATION = `
	mutation DeactivateUser($id: UUID!) { users { deactivate(id: $id) { id status } } }
`;
const CHANGE_PASSWORD_MUTATION = `
	mutation ChangePassword($input: ChangePasswordInput!) {
		users { changePassword(input: $input) }
	}
`;

const ASSIGN_POLICY_MUTATION = `
	mutation AssignPolicyToUser($input: AssignPolicyToUserInput!) {
		users { assignPolicy(input: $input) }
	}
`;

const UNASSIGN_POLICY_MUTATION = `
	mutation UnassignPolicyFromUser($policyId: UUID!, $userId: UUID!) {
		users { unassignPolicy(policyId: $policyId, userId: $userId) }
	}
`;

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
		const result = await gqlFetch<
			{
				users: {
					users: { nodes: User[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } };
				};
			},
			Record<string, unknown>
		>(
			USERS_QUERY,
			{ first: 25, after, where: Object.keys(where).length > 0 ? where : undefined },
			{ token: locals.accessToken?.tokenValue }
		);
		return result.users.users ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
	}
);

export const getUser = query(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<{ users: { user: User | null } }, { id: string }>(
			USER_QUERY,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		return result.users.user;
	}
);

export const createUser = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		_password: v.pipe(v.string(), v.nonEmpty('Password is required')),
		status: v.optional(v.string()),
		roleIds: v.optional(v.string()),
		policyIds: v.optional(v.string())
	}),
	async ({ name, _password, status, roleIds, policyIds }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<
			{ users: { create: { id: string } } },
			{ input: Record<string, unknown> }
		>(
			CREATE_USER_MUTATION,
			{
				input: {
					name,
					password: _password,
					status: status || 'ACTIVE',
					roleIds: roleIds ? roleIds.split(',').filter(Boolean) : undefined,
					policyIds: policyIds ? policyIds.split(',').filter(Boolean) : undefined
				}
			},
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/users/${result.users.create.id}`);
	}
);

export const updateUser = form(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty()),
		name: v.optional(v.string()),
		status: v.optional(v.string())
	}),
	async ({ id, name, status }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			UPDATE_USER_MUTATION,
			{ input: { id, name: name || undefined, status: status || undefined } },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/users/${id}`);
	}
);

export const deleteUser = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { id: string }>(
			DELETE_USER_MUTATION,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, '/settings/users');
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
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			ASSIGN_ROLE_MUTATION,
			{ input: { userId, roleId, expiresAt: expiresAt || undefined } },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/users/${userId}`);
	}
);

export const unassignRole = form(
	v.object({
		userId: v.pipe(v.string(), v.nonEmpty()),
		roleId: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ userId, roleId }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { userId: string; roleId: string }>(
			UNASSIGN_ROLE_MUTATION,
			{ userId, roleId },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/users/${userId}`);
	}
);

export const activateUser = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { id: string }>(
			ACTIVATE_MUTATION,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/users/${id}`);
	}
);

export const deactivateUser = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { id: string }>(
			DEACTIVATE_MUTATION,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/users/${id}`);
	}
);

export const changePassword = form(
	v.object({
		userId: v.pipe(v.string(), v.nonEmpty()),
		_newPassword: v.pipe(v.string(), v.nonEmpty('New password is required'))
	}),
	async ({ userId, _newPassword }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			CHANGE_PASSWORD_MUTATION,
			{ input: { userId, newPassword: _newPassword } },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/users/${userId}`);
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
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			ASSIGN_POLICY_MUTATION,
			{ input: { userId, policyId, expiresAt: expiresAt || undefined } },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/users/${userId}`);
	}
);

export const unassignPolicyFromUser = form(
	v.object({
		userId: v.pipe(v.string(), v.nonEmpty()),
		policyId: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ userId, policyId }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { policyId: string; userId: string }>(
			UNASSIGN_POLICY_MUTATION,
			{ policyId, userId },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/users/${userId}`);
	}
);
