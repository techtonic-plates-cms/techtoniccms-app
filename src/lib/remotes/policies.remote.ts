import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';

export type PolicyRule = {
	id: string;
	attributePath: string;
	operator: string;
	expectedValue: string;
	valueType: string;
	isActive: boolean;
	order: number;
	description: string | null;
};

export type Policy = {
	id: string;
	name: string;
	description: string | null;
	actionType: string;
	effect: string;
	resourceType: string;
	isActive: boolean;
	priority: number;
	ruleConnector: string;
	createdAt: string | null;
	updatedAt: string | null;
	rules: PolicyRule[];
	assignedToRoles: Array<{ id: string; name: string }>;
	assignedToUsers: Array<{ id: string; name: string }>;
};

const POLICIES_QUERY = `
	query Policies($limit: Int, $offset: Int, $search: String, $resourceType: BaseResource, $actionType: PermissionAction, $effect: PermissionEffect, $isActive: Boolean) {
		policy {
			policies(limit: $limit, offset: $offset, search: $search, resourceType: $resourceType, actionType: $actionType, effect: $effect, isActive: $isActive) {
				id name description actionType effect resourceType isActive priority createdAt
				rules { id attributePath operator expectedValue valueType isActive order }
				assignedToRoles { id name }
				assignedToUsers { id name }
			}
		}
	}
`;

const POLICY_QUERY = `
	query Policy($id: UUID) {
		policy {
			policy(id: $id) {
				id name description actionType effect resourceType
				isActive priority ruleConnector createdAt updatedAt
				rules { id attributePath operator expectedValue valueType isActive order description }
				assignedToRoles { id name }
				assignedToUsers { id name }
			}
		}
	}
`;

const CREATE_POLICY_MUTATION = `
	mutation CreatePolicy($input: CreatePolicyInput!) {
		policy {
			create(input: $input) { id name }
		}
	}
`;

const UPDATE_POLICY_MUTATION = `
	mutation UpdatePolicy($input: UpdatePolicyInput!) {
		policy {
			update(input: $input) { id name }
		}
	}
`;

const DELETE_POLICY_MUTATION = `
	mutation DeletePolicy($id: UUID!) {
		policy { delete(id: $id) }
	}
`;

export const getPolicies = query(
	v.object({
		search: v.optional(v.string()),
		resourceType: v.optional(v.string()),
		actionType: v.optional(v.string()),
		effect: v.optional(v.string()),
		isActive: v.optional(v.string())
	}),
	async ({ search, resourceType, actionType, effect, isActive }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<
			{ policy: { policies: Policy[] } },
			Record<string, unknown>
		>(POLICIES_QUERY, {
			limit: 25,
			offset: 0,
			search,
			resourceType,
			actionType,
			effect,
			isActive: isActive === undefined || isActive === null ? undefined : isActive === 'true'
		}, { token: locals.accessToken?.tokenValue });
		return result.policy.policies ?? [];
	}
);

export const getPolicy = query(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<
			{ policy: { policy: Policy | null } },
			{ id: string }
		>(POLICY_QUERY, { id }, { token: locals.accessToken?.tokenValue });
		return result.policy.policy;
	}
);

export const createPolicy = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		description: v.optional(v.string()),
		actionType: v.pipe(v.string(), v.nonEmpty('Action type is required')),
		effect: v.pipe(v.string(), v.nonEmpty('Effect is required')),
		resourceType: v.pipe(v.string(), v.nonEmpty('Resource type is required')),
		isActive: v.optional(v.string()),
		priority: v.optional(v.string()),
		ruleConnector: v.optional(v.string()),
		rulesJson: v.optional(v.string())
	}),
	async ({ name, description, actionType, effect, resourceType, isActive, priority, ruleConnector, rulesJson }) => {
		const { locals } = getRequestEvent();
		const rules = rulesJson ? JSON.parse(rulesJson) : [];
		const result = await gqlFetch<
			{ policy: { create: { id: string } } },
			{ input: Record<string, unknown> }
		>(CREATE_POLICY_MUTATION, {
			input: {
				name,
				description: description || undefined,
				actionType,
				effect,
				resourceType,
				isActive: isActive === 'on',
				priority: priority ? parseInt(priority, 10) : 0,
				ruleConnector: ruleConnector || 'AND',
				rules
			}
		}, { token: locals.accessToken?.tokenValue });
		redirect(303, `/settings/policies/${result.policy.create.id}`);
	}
);

export const updatePolicy = form(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty()),
		name: v.optional(v.string()),
		description: v.optional(v.string()),
		isActive: v.optional(v.string()),
		priority: v.optional(v.string()),
		effect: v.optional(v.string()),
		ruleConnector: v.optional(v.string())
	}),
	async ({ id, name, description, isActive, priority, effect, ruleConnector }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			UPDATE_POLICY_MUTATION,
			{
				input: {
					id,
					name: name || undefined,
					description: description || undefined,
					isActive: isActive === 'on',
					priority: priority ? parseInt(priority, 10) : undefined,
					effect: effect || undefined,
					ruleConnector: ruleConnector || undefined
				}
			},
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/policies/${id}`);
	}
);

export const deletePolicy = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { id: string }>(DELETE_POLICY_MUTATION, { id }, { token: locals.accessToken?.tokenValue });
		redirect(303, '/settings/policies');
	}
);

export const addPolicyRule = form(
	v.object({
		policyId: v.pipe(v.string(), v.nonEmpty()),
		attributePath: v.pipe(v.string(), v.nonEmpty('Attribute path is required')),
		operator: v.pipe(v.string(), v.nonEmpty('Operator is required')),
		expectedValue: v.pipe(v.string(), v.nonEmpty('Expected value is required')),
		valueType: v.pipe(v.string(), v.nonEmpty('Value type is required')),
		isActive: v.optional(v.string()),
		description: v.optional(v.string())
	}),
	async ({ policyId, attributePath, operator, expectedValue, valueType, isActive, description }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			UPDATE_POLICY_MUTATION,
			{
				input: {
					id: policyId,
					rules: [{
						attributePath,
						operator,
						expectedValue,
						valueType,
						isActive: isActive === 'on',
						description: description || undefined,
						order: 0
					}]
				}
			},
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/policies/${policyId}`);
	}
);

export const deletePolicyRule = form(
	v.object({
		policyId: v.pipe(v.string(), v.nonEmpty()),
		ruleId: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ policyId, ruleId }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			UPDATE_POLICY_MUTATION,
			{ input: { id: policyId, deleteRuleIds: [ruleId] } },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/policies/${policyId}`);
	}
);
