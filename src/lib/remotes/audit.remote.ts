import { query, getRequestEvent } from '$app/server';
import { gqlFetch } from '$lib/server/gql';
import * as v from 'valibot';

export type Audit = {
	id: string;
	requestedAction: string;
	resourceType: string;
	decision: 'ALLOW' | 'DENY';
	decisionReason: string;
	evaluationTimeMs: number;
	timestamp: string;
	ipAddress?: string | null;
	userAgent?: string | null;
	sessionId?: string | null;
	user: { id: string; name: string };
	evaluatedPolicyIds?: string[] | null;
	matchingPolicyIds?: string[] | null;
};

const AUDITS_QUERY = `
	query Audits($first: Int, $after: String, $where: AbacAuditFilterInput, $order: [AbacAuditSortInput!]) {
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
`;

const AUDIT_QUERY = `
	query Audit($id: UUID!) {
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
`;

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

		const result = await gqlFetch<
			{
				audit: {
					audits: {
						nodes: Audit[];
						pageInfo: { hasNextPage: boolean; endCursor: string | null };
					};
				};
			},
			Record<string, unknown>
		>(
			AUDITS_QUERY,
			{
				first: 25,
				after,
				where: Object.keys(where).length > 0 ? where : undefined,
				order: [{ timestamp: 'DESC' }]
			},
			{ token: locals.accessToken?.tokenValue }
		);
		return result.audit.audits ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
	}
);

export const getAudit = query(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<{ audit: { audit: Audit | null } }, { id: string }>(
			AUDIT_QUERY,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		return result.audit.audit;
	}
);
