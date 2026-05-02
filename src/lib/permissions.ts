import type { BaseResource, PermissionAction, MeQuery } from 'techtonic-client-gql';

export type AuthUser = NonNullable<MeQuery['auth']['me']>;

function isExpired(expiresAt: unknown): boolean {
	if (!expiresAt) return false;
	const ts = new Date(expiresAt as string | number | Date).getTime();
	return ts < Date.now();
}

function policyAllows(
	policy: { effect: string; resourceType: BaseResource; actionType: PermissionAction },
	resourceType: BaseResource,
	actionType: PermissionAction
): boolean {
	return (
		policy.effect === 'ALLOW' &&
		policy.resourceType === resourceType &&
		policy.actionType === actionType
	);
}

/**
 * Check if a user has an ALLOW policy for a given resource and action.
 * This is a lightweight presence check based on the user's direct policies
 * and role policies returned by ME_QUERY. It does not evaluate ABAC rules —
 * the API remains the ultimate authority. Use this to proactively hide UI
 * modules; always keep a 403 fallback on the actual remote call.
 */
export function hasPermission(
	user: AuthUser,
	resourceType: BaseResource,
	actionType: PermissionAction
): boolean {
	// Check direct user policies
	const directAllowed = user.policies.some((userPolicy) => {
		if (isExpired(userPolicy.expiresAt)) return false;
		return policyAllows(userPolicy.policy, resourceType, actionType);
	});
	if (directAllowed) return true;

	// Check role policies
	return user.roles.some((userRole) => {
		if (isExpired(userRole.expiresAt)) return false;
		return userRole.role.policies.some((rolePolicy) => {
			if (isExpired(rolePolicy.expiresAt)) return false;
			return policyAllows(rolePolicy.policy, resourceType, actionType);
		});
	});
}
