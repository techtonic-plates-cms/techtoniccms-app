import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch, handleGraphQLError, handleGraphQLErrorForm } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';

export type PolicyRuleValue = {
	stringValue?: string;
	numberValue?: number;
	booleanValue?: boolean;
	uuidValue?: string;
	dateTimeValue?: string;
	arrayValue?: string[];
	contextReferencePath?: string;
};

export type PolicyRule = {
	id: string;
	attributePath: string;
	operator: string;
	value: PolicyRuleValue;
	contextReferencePath?: string | null;
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
};

const RULE_VALUE_FRAGMENT = `
	expectedStringValue expectedNumberValue expectedBooleanValue expectedDateTimeValue expectedUuidValue expectedArrayValue
	contextReferencePath
`;

const POLICIES_QUERY = `
	query Policies($first: Int, $after: String, $where: AbacPolicyFilterInput) {
		policy {
			policies(first: $first, after: $after, where: $where) {
				nodes {
					id name description actionType effect resourceType isActive priority ruleConnector createdAt
					rules { id attributePath operator ${RULE_VALUE_FRAGMENT} isActive order description }
				}
				pageInfo { hasNextPage endCursor }
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
				rules { id attributePath operator ${RULE_VALUE_FRAGMENT} isActive order description }
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

const POLICIES_COMBOBOX_QUERY = `
	query PoliciesForCombobox($first: Int, $where: AbacPolicyFilterInput) {
		policy {
			policies(first: $first, where: $where) {
				nodes { id name effect resourceType actionType }
			}
		}
	}
`;

export const getPoliciesForCombobox = query(
	v.object({ search: v.optional(v.string()) }),
	async ({ search }) => {
		const { locals } = getRequestEvent();
		const where: Record<string, unknown> = {};
		if (search) where.name = { contains: search };
		try {
			const result = await gqlFetch<
				{
					policy: {
						policies: {
							nodes: Array<{
								id: string;
								name: string;
								effect: string;
								resourceType: string;
								actionType: string;
							}>;
						};
					};
				},
				{ first: number; where?: Record<string, unknown> }
			>(
				POLICIES_COMBOBOX_QUERY,
				{ first: 20, where: Object.keys(where).length > 0 ? where : undefined },
				{ token: locals.accessToken?.tokenValue }
			);
			return result.policy.policies?.nodes ?? [];
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const getPolicies = query(
	v.object({
		search: v.optional(v.string()),
		resourceType: v.optional(v.string()),
		actionType: v.optional(v.string()),
		effect: v.optional(v.string()),
		isActive: v.optional(v.string()),
		after: v.optional(v.string())
	}),
	async ({ search, resourceType, actionType, effect, isActive, after }) => {
		const { locals } = getRequestEvent();
		const where: Record<string, unknown> = {};
		if (search) where.name = { contains: search };
		if (resourceType) where.resourceType = { eq: resourceType };
		if (actionType) where.actionType = { eq: actionType };
		if (effect) where.effect = { eq: effect };
		if (isActive !== undefined && isActive !== null) where.isActive = { eq: isActive === 'true' };
		try {
			const result = await gqlFetch<
				{
					policy: {
						policies: {
							nodes: Policy[];
							pageInfo: { hasNextPage: boolean; endCursor: string | null };
						};
					};
				},
				Record<string, unknown>
			>(
				POLICIES_QUERY,
				{
					first: 25,
					after,
					where: Object.keys(where).length > 0 ? where : undefined
				},
				{ token: locals.accessToken?.tokenValue }
			);
			return (
				result.policy.policies ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } }
			);
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const getPolicy = query(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<{ policy: { policy: Policy | null } }, { id: string }>(
				POLICY_QUERY,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			return result.policy.policy;
		} catch (err) {
			handleGraphQLError(err);
		}
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
	async ({
		name,
		description,
		actionType,
		effect,
		resourceType,
		isActive,
		priority,
		ruleConnector,
		rulesJson
	}) => {
		const { locals } = getRequestEvent();
		try {
			const rules = rulesJson ? JSON.parse(rulesJson) : [];
			const result = await gqlFetch<
				{ policy: { create: { id: string } } },
				{ input: Record<string, unknown> }
			>(
				CREATE_POLICY_MUTATION,
				{
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
				},
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/policies/${result.policy.create.id}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
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
		try {
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
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const deletePolicy = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<unknown, { id: string }>(
				DELETE_POLICY_MUTATION,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, '/settings/policies');
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const addPolicyRule = form(
	v.object({
		policyId: v.pipe(v.string(), v.nonEmpty()),
		attributePath: v.pipe(v.string(), v.nonEmpty('Attribute path is required')),
		operator: v.pipe(v.string(), v.nonEmpty('Operator is required')),
		valueJson: v.optional(v.string()),
		isActive: v.optional(v.string()),
		description: v.optional(v.string())
	}),
	async ({ policyId, attributePath, operator, valueJson, isActive, description }) => {
		const { locals } = getRequestEvent();
		try {
			const value = valueJson ? JSON.parse(valueJson) : undefined;
			await gqlFetch<unknown, { input: Record<string, unknown> }>(
				UPDATE_POLICY_MUTATION,
				{
					input: {
						id: policyId,
						rules: [
							{
								attributePath,
								operator,
								value,
								isActive: isActive === 'on',
								description: description || undefined,
								order: 0
							}
						]
					}
				},
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/policies/${policyId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const deletePolicyRule = form(
	v.object({
		policyId: v.pipe(v.string(), v.nonEmpty()),
		ruleId: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ policyId, ruleId }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<unknown, { input: Record<string, unknown> }>(
				UPDATE_POLICY_MUTATION,
				{ input: { id: policyId, deleteRuleIds: [ruleId] } },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/policies/${policyId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const duplicatePolicy = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			const policy = await gqlFetch<{ policy: { policy: Policy | null } }, { id: string }>(
				POLICY_QUERY,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			if (!policy.policy?.policy) {
				redirect(303, '/settings/policies');
			}
			const p = policy.policy.policy;
			const result = await gqlFetch<
				{ policy: { create: { id: string } } },
				{ input: Record<string, unknown> }
			>(
				CREATE_POLICY_MUTATION,
				{
					input: {
						name: `Copy of ${p.name}`,
						description: p.description || undefined,
						actionType: p.actionType,
						effect: p.effect,
						resourceType: p.resourceType,
						isActive: p.isActive,
						priority: p.priority,
						ruleConnector: p.ruleConnector,
						rules: p.rules.map((r, i) => {
							const raw = r as unknown as {
								expectedStringValue?: string | null;
								expectedNumberValue?: number | null;
								expectedBooleanValue?: boolean | null;
								expectedDateTimeValue?: string | null;
								expectedUuidValue?: string | null;
								expectedArrayValue?: string[] | null;
								contextReferencePath?: string | null;
							};
							const value: Record<string, unknown> = {};
							if (raw.expectedStringValue != null) value.stringValue = raw.expectedStringValue;
							if (raw.expectedNumberValue != null) value.numberValue = raw.expectedNumberValue;
							if (raw.expectedBooleanValue != null) value.booleanValue = raw.expectedBooleanValue;
							if (raw.expectedDateTimeValue != null)
								value.dateTimeValue = raw.expectedDateTimeValue;
							if (raw.expectedUuidValue != null) value.uuidValue = raw.expectedUuidValue;
							if (raw.expectedArrayValue != null) value.arrayValue = raw.expectedArrayValue;
							if (raw.contextReferencePath != null)
								value.contextReferencePath = raw.contextReferencePath;
							return {
								attributePath: r.attributePath,
								operator: r.operator,
								value: Object.keys(value).length > 0 ? value : undefined,
								isActive: r.isActive,
								description: r.description || undefined,
								order: i
							};
						})
					}
				},
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/policies/${result.policy.create.id}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);
