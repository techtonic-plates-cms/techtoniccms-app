import { query, getRequestEvent } from '$app/server';
import { gqlFetch, handleGraphQLError } from '$lib/server/gql';
import * as v from 'valibot';
import { graphql, SortEnumType, type GetAuditQuery, type GetAuditQueryVariables, type GetAuditsQuery, type GetAuditsQueryVariables } from 'techtonic-client-gql';

const AUDITS_QUERY = graphql(`
	query GetAudits($first: Int, $after: String, $where: AbacAuditFilterInput, $order: [AbacAuditSortInput!]) {
		audit {
			audits(first: $first, after: $after, where: $where, order: $order) {
				nodes {
					id
					requestedAction
					resourceType
					decision
					decisionReason
					evaluationTimeMs
					timestamp
					ipAddress
					userAgent
					sessionId
					user { id name }
					evaluatedPolicyIds
					matchingPolicyIds
				}
				pageInfo { hasNextPage endCursor }
			}
		}
	}
`);

const AUDIT_QUERY = graphql(`
	query GetAudit($id: UUID!) {
		audit {
			audit(id: $id) {
				id
				requestedAction
				resourceType
				decision
				decisionReason
				evaluationTimeMs
				timestamp
				ipAddress
				userAgent
				sessionId
				user { id name }
				evaluatedPolicyIds
				matchingPolicyIds
			}
		}
	}
`);

export const getAudits = query(
	v.object({
		search: v.optional(v.string()),
		decision: v.optional(v.string()),
		resourceType: v.optional(v.string()),
		requestedAction: v.optional(v.string()),
		after: v.optional(v.string())
	}),
	async ({ search, decision, resourceType, requestedAction, after }) => {
		const { locals } = getRequestEvent();
		const where: Record<string, unknown> = {};
		if (search) where.user = { name: { contains: search } };
		if (decision) where.decision = { eq: decision };
		if (resourceType) where.resourceType = { eq: resourceType };
		if (requestedAction) where.requestedAction = { eq: requestedAction };

		try {
			const result = await gqlFetch<
				GetAuditsQuery, GetAuditsQueryVariables
			>(
				AUDITS_QUERY,
				{
					first: 25,
					after,
					where: Object.keys(where).length > 0 ? where : undefined,
					order: [{ timestamp: SortEnumType.Desc }]
				},
				{ token: locals.accessToken?.tokenValue }
			);
			return (
				result.audit.audits! ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } }
			);
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const getAudit = query(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<GetAuditQuery, GetAuditQueryVariables>(
				AUDIT_QUERY,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			return result.audit!;
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);
