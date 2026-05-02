/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\tquery GetApiKeys($first: Int, $after: String) {\n\t\tapiKeys {\n\t\t\tapiKeys(first: $first, after: $after) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name keyPrefix isActive createdAt updatedAt expiresAt lastUsedAt\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetApiKeysDocument,
    "\n\tquery GetApiKey($id: UUID!) {\n\t\tapiKeys {\n\t\t\tapiKey(id: $id) {\n\t\t\t\tid name keyPrefix isActive createdAt updatedAt expiresAt lastUsedAt\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetApiKeyDocument,
    "\n\tmutation CreateApiKey($input: CreateApiKeyInput!) {\n\t\tapiKeys {\n\t\t\tcreateApiKey(input: $input) {\n\t\t\t\tapiKey { id }\n\t\t\t\tkey\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CreateApiKeyDocument,
    "\n\tmutation UpdateApiKey($input: UpdateApiKeyInput!) {\n\t\tapiKeys {\n\t\t\tupdateApiKey(input: $input) { id name isActive }\n\t\t}\n\t}\n": typeof types.UpdateApiKeyDocument,
    "\n\tmutation RevokeApiKey($id: UUID!) {\n\t\tapiKeys {\n\t\t\trevokeApiKey(id: $id) { id isActive }\n\t\t}\n\t}\n": typeof types.RevokeApiKeyDocument,
    "\n\tmutation DeleteApiKey($id: UUID!) {\n\t\tapiKeys { deleteApiKey(id: $id) }\n\t}\n": typeof types.DeleteApiKeyDocument,
    "\n\tquery GetAssets($first: Int, $after: String) {\n\t\tassets {\n\t\t\tassets(first: $first, after: $after) {\n\t\t\t\tnodes {\n\t\t\t\t\tid filename mimeType fileSize url alt caption isPublic uploadedAt\n\t\t\t\t\tuploadedByUser { id name }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetAssetsDocument,
    "\n\tquery AssetsCombobox($search: String, $first: Int) {\n\t\tassets {\n\t\t\tassets(first: $first, where: {\n\t\t\t\tor: [\n\t\t\t\t\t{ filename: { contains: $search } }\n\t\t\t\t\t{ caption: { contains: $search } }\n\t\t\t\t]\n\t\t\t}) {\n\t\t\t\tnodes { id filename caption }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AssetsComboboxDocument,
    "\n\tmutation UpdateAsset($input: UpdateAssetInput!) {\n\t\tassets {\n\t\t\tupdate(input: $input) { id filename alt caption isPublic }\n\t\t}\n\t}\n": typeof types.UpdateAssetDocument,
    "\n\tmutation DeleteAsset($id: UUID!) {\n\t\tassets {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n": typeof types.DeleteAssetDocument,
    "\n\tquery GetAudits($first: Int, $after: String, $where: AbacAuditFilterInput, $order: [AbacAuditSortInput!]) {\n\t\taudit {\n\t\t\taudits(first: $first, after: $after, where: $where, order: $order) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\trequestedAction\n\t\t\t\t\tresourceType\n\t\t\t\t\tdecision\n\t\t\t\t\tdecisionReason\n\t\t\t\t\tevaluationTimeMs\n\t\t\t\t\ttimestamp\n\t\t\t\t\tipAddress\n\t\t\t\t\tuserAgent\n\t\t\t\t\tsessionId\n\t\t\t\t\tuser { id name }\n\t\t\t\t\tevaluatedPolicyIds\n\t\t\t\t\tmatchingPolicyIds\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetAuditsDocument,
    "\n\tquery GetAudit($id: UUID!) {\n\t\taudit {\n\t\t\taudit(id: $id) {\n\t\t\t\tid\n\t\t\t\trequestedAction\n\t\t\t\tresourceType\n\t\t\t\tdecision\n\t\t\t\tdecisionReason\n\t\t\t\tevaluationTimeMs\n\t\t\t\ttimestamp\n\t\t\t\tipAddress\n\t\t\t\tuserAgent\n\t\t\t\tsessionId\n\t\t\t\tuser { id name }\n\t\t\t\tevaluatedPolicyIds\n\t\t\t\tmatchingPolicyIds\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetAuditDocument,
    "\n\tquery GetCollections {\n\t\tcollections {\n\t\t\tcollectionsData {\n\t\t\t\tnodes {\n\t\t\t\t\tid name slug color description entryCount\n\t\t\t\t\tisLocalized defaultLocale createdAt\n\t\t\t\t\ticon { id url filename }\n\t\t\t\t\tfields { id }\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetCollectionsDocument,
    "\n\tquery CollectionsCombobox($search: String) {\n\t\tcollections {\n\t\t\tcollectionsData(first: 20, where: { name: { contains: $search } }) {\n\t\t\t\tnodes { id name slug }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CollectionsComboboxDocument,
    "\n\tquery GetCollection($slug: String) {\n\t\tcollections {\n\t\t\tcollectionData(slug: $slug) {\n\t\t\t\tid name slug color description entryCount\n\t\t\t\tisLocalized defaultLocale supportedLocales createdAt updatedAt\n\t\t\t\ticon { id url filename }\n\t\t\t\tfields {\n\t\t\t\t\tid name label dataType isRequired isUnique\n\t\t\t\t\tdefaultValue description helpText relatedCollectionId \n\t\t\t\t\trelatedCollection {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\tdefaultLocale\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tentryCount\n\t\t\t\t\t\tid\n\t\t\t\t\t\tisLocalized\n\t\t\t\t\t\tname\n\t\t\t\t\t\tslug\n\t\t\t\t\t\tsupportedLocales\n\t\t\t\t\t\tupdatedAt\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetCollectionDocument,
    "\n\tmutation CreateCollection($input: CreateCollectionInput!) {\n\t\tcollections {\n\t\t\tcreate(input: $input) { id slug }\n\t\t}\n\t}\n": typeof types.CreateCollectionDocument,
    "\n\tmutation DeleteCollection($id: UUID!) {\n\t\tcollections {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n": typeof types.DeleteCollectionDocument,
    "\n\tmutation UpdateCollection($input: UpdateCollectionInput!) {\n\t\tcollections {\n\t\t\tupdate(input: $input) { id slug }\n\t\t}\n\t}\n": typeof types.UpdateCollectionDocument,
    "\n\tquery GetPolicies($first: Int, $after: String, $where: AbacPolicyFilterInput) {\n\t\tpolicy {\n\t\t\tpolicies(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name description actionType effect resourceType isActive priority ruleConnector createdAt\n\t\t\t\t\trules { id attributePath operator \texpectedStringValue expectedNumberValue expectedBooleanValue expectedDateTimeValue expectedUuidValue expectedArrayValue\n\tcontextReferencePath isActive order description }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetPoliciesDocument,
    "\n\tquery GetPolicy($id: UUID) {\n\t\tpolicy {\n\t\t\tpolicy(id: $id) {\n\t\t\t\tid name description actionType effect resourceType\n\t\t\t\tisActive priority ruleConnector createdAt updatedAt\n\t\t\t\trules { id attributePath operator \texpectedStringValue expectedNumberValue expectedBooleanValue expectedDateTimeValue expectedUuidValue expectedArrayValue\n\tcontextReferencePath isActive order description }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetPolicyDocument,
    "\n\tmutation CreatePolicy($input: CreatePolicyInput!) {\n\t\tpolicy {\n\t\t\tcreate(input: $input) { id name }\n\t\t}\n\t}\n": typeof types.CreatePolicyDocument,
    "\n\tmutation UpdatePolicy($input: UpdatePolicyInput!) {\n\t\tpolicy {\n\t\t\tupdate(input: $input) { id name }\n\t\t}\n\t}\n": typeof types.UpdatePolicyDocument,
    "\n\tmutation DeletePolicy($id: UUID!) {\n\t\tpolicy { delete(id: $id) }\n\t}\n": typeof types.DeletePolicyDocument,
    "\n\tquery PoliciesForCombobox($first: Int, $where: AbacPolicyFilterInput) {\n\t\tpolicy {\n\t\t\tpolicies(first: $first, where: $where) {\n\t\t\t\tnodes { id name effect resourceType actionType }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.PoliciesForComboboxDocument,
    "\n\tquery GetRoles($first: Int, $after: String, $where: RoleFilterInput) {\n\t\troles {\n\t\t\troles(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name description creationTime lastEditTime\n\t\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name actionType effect resourceType description } }\n\t\t\t\t\tusers { id assignedAt expiresAt role { id name } }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetRolesDocument,
    "\n\tquery GetRole($id: UUID) {\n\t\troles {\n\t\t\trole(id: $id) {\n\t\t\t\tid name description creationTime lastEditTime\n\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name actionType effect resourceType description } }\n\t\t\t\tusers { id assignedAt expiresAt role { id name } }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetRoleDocument,
    "\n\tmutation CreateRole($input: CreateRoleInput!) {\n\t\troles { create(input: $input) { id name } }\n\t}\n": typeof types.CreateRoleDocument,
    "\n\tmutation UpdateRole($input: UpdateRoleInput!) {\n\t\troles { update(input: $input) { id name } }\n\t}\n": typeof types.UpdateRoleDocument,
    "\n\tmutation DeleteRole($id: UUID!) {\n\t\troles { delete(id: $id) }\n\t}\n": typeof types.DeleteRoleDocument,
    "\n\tmutation AssignPolicyToRole($input: AssignPolicyToRoleInput!) {\n\t\troles { assignPolicy(input: $input) }\n\t}\n": typeof types.AssignPolicyToRoleDocument,
    "\n\tmutation UnassignPolicyFromRole($policyId: UUID!, $roleId: UUID!) {\n\t\troles { unassignPolicy(policyId: $policyId, roleId: $roleId) }\n\t}\n": typeof types.UnassignPolicyFromRoleDocument,
    "\n\tquery RolesForCombobox($first: Int, $where: RoleFilterInput) {\n\t\troles {\n\t\t\troles(first: $first, where: $where) {\n\t\t\t\tnodes { id name description }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RolesForComboboxDocument,
    "\n\tquery GetUsers($first: Int, $after: String, $where: UserFilterInput) {\n\t\tusers {\n\t\t\tusers(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name status creationTime lastLoginTime lastEditTime\n\t\t\t\t\troles { id role { id name } }\n\t\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name effect resourceType actionType } }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetUsersDocument,
    "\n\tquery GetUser($id: UUID) {\n\t\tusers {\n\t\t\tuser(id: $id) {\n\t\t\t\tid name status creationTime lastLoginTime lastEditTime\n\t\t\t\troles { id role {id name} assignedAt expiresAt }\n\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name effect resourceType actionType } }\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetUserDocument,
    "\n\tmutation CreateUser($input: CreateUserInput!) {\n\t\tusers {\n\t\t\tcreate(input: $input) { id name }\n\t\t}\n\t}\n": typeof types.CreateUserDocument,
    "\n\tmutation UpdateUser($input: UpdateUserInput!) {\n\t\tusers {\n\t\t\tupdate(input: $input) { id name }\n\t\t}\n\t}\n": typeof types.UpdateUserDocument,
    "\n\tmutation DeleteUser($id: UUID!) {\n\t\tusers { delete(id: $id) }\n\t}\n": typeof types.DeleteUserDocument,
    "\n\tmutation AssignRole($input: AssignRoleInput!) {\n\t\tusers { assignRole(input: $input) }\n\t}\n": typeof types.AssignRoleDocument,
    "\n\tmutation UnassignRole($userId: UUID!, $roleId: UUID!) {\n\t\tusers { unassignRole(userId: $userId, roleId: $roleId) }\n\t}\n": typeof types.UnassignRoleDocument,
    "\n\tmutation ActivateUser($id: UUID!) { users { activate(id: $id) { id status } } }\n": typeof types.ActivateUserDocument,
    "\n\tmutation DeactivateUser($id: UUID!) { users { deactivate(id: $id) { id status } } }\n": typeof types.DeactivateUserDocument,
    "\n\tmutation ChangePassword($input: ChangePasswordInput!) {\n\t\tusers { changePassword(input: $input) }\n\t}\n": typeof types.ChangePasswordDocument,
    "\n\tmutation AssignPolicyToUser($input: AssignPolicyToUserInput!) {\n\t\tusers { assignPolicy(input: $input) }\n\t}\n": typeof types.AssignPolicyToUserDocument,
    "\n\tmutation UnassignPolicyFromUser($policyId: UUID!, $userId: UUID!) {\n\t\tusers { unassignPolicy(policyId: $policyId, userId: $userId) }\n\t}\n": typeof types.UnassignPolicyFromUserDocument,
    "\n\tmutation Login($name: String!, $password: String!) {\n\t\tauth {\n\t\t\tlogin(name: $name, password: $password) {\n\t\t\t\taccessToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\trefreshToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\troles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\trole {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tpolicies {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tpolicies {\n\t\t\t\t\t\tid\n\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.LoginDocument,
    "\n\tquery Me {\n\t\tauth {\n\t\t\tme {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tcreationTime\n\t\t\t\tlastLoginTime\n\t\t\t\troles {\n\t\t\t\t\tid\n\t\t\t\t\tassignedAt\n\t\t\t\t\texpiresAt\n\t\t\t\t\trole {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tpolicies {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpolicies {\n\t\t\t\t\tid\n\t\t\t\t\texpiresAt\n\t\t\t\t\tpolicy {\n\t\t\t\t\t\tresourceType\n\t\t\t\t\t\tactionType\n\t\t\t\t\t\teffect\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.MeDocument,
    "\n\tmutation Refresh($refreshToken: String!) {\n\t\tauth {\n\t\t\trefresh(refreshToken: $refreshToken) {\n\t\t\t\taccessToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\trefreshToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RefreshDocument,
    "\n\tmutation Logout {\n\t\tauth {\n\t\t\tlogout {\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n": typeof types.LogoutDocument,
};
const documents: Documents = {
    "\n\tquery GetApiKeys($first: Int, $after: String) {\n\t\tapiKeys {\n\t\t\tapiKeys(first: $first, after: $after) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name keyPrefix isActive createdAt updatedAt expiresAt lastUsedAt\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": types.GetApiKeysDocument,
    "\n\tquery GetApiKey($id: UUID!) {\n\t\tapiKeys {\n\t\t\tapiKey(id: $id) {\n\t\t\t\tid name keyPrefix isActive createdAt updatedAt expiresAt lastUsedAt\n\t\t\t}\n\t\t}\n\t}\n": types.GetApiKeyDocument,
    "\n\tmutation CreateApiKey($input: CreateApiKeyInput!) {\n\t\tapiKeys {\n\t\t\tcreateApiKey(input: $input) {\n\t\t\t\tapiKey { id }\n\t\t\t\tkey\n\t\t\t}\n\t\t}\n\t}\n": types.CreateApiKeyDocument,
    "\n\tmutation UpdateApiKey($input: UpdateApiKeyInput!) {\n\t\tapiKeys {\n\t\t\tupdateApiKey(input: $input) { id name isActive }\n\t\t}\n\t}\n": types.UpdateApiKeyDocument,
    "\n\tmutation RevokeApiKey($id: UUID!) {\n\t\tapiKeys {\n\t\t\trevokeApiKey(id: $id) { id isActive }\n\t\t}\n\t}\n": types.RevokeApiKeyDocument,
    "\n\tmutation DeleteApiKey($id: UUID!) {\n\t\tapiKeys { deleteApiKey(id: $id) }\n\t}\n": types.DeleteApiKeyDocument,
    "\n\tquery GetAssets($first: Int, $after: String) {\n\t\tassets {\n\t\t\tassets(first: $first, after: $after) {\n\t\t\t\tnodes {\n\t\t\t\t\tid filename mimeType fileSize url alt caption isPublic uploadedAt\n\t\t\t\t\tuploadedByUser { id name }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": types.GetAssetsDocument,
    "\n\tquery AssetsCombobox($search: String, $first: Int) {\n\t\tassets {\n\t\t\tassets(first: $first, where: {\n\t\t\t\tor: [\n\t\t\t\t\t{ filename: { contains: $search } }\n\t\t\t\t\t{ caption: { contains: $search } }\n\t\t\t\t]\n\t\t\t}) {\n\t\t\t\tnodes { id filename caption }\n\t\t\t}\n\t\t}\n\t}\n": types.AssetsComboboxDocument,
    "\n\tmutation UpdateAsset($input: UpdateAssetInput!) {\n\t\tassets {\n\t\t\tupdate(input: $input) { id filename alt caption isPublic }\n\t\t}\n\t}\n": types.UpdateAssetDocument,
    "\n\tmutation DeleteAsset($id: UUID!) {\n\t\tassets {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n": types.DeleteAssetDocument,
    "\n\tquery GetAudits($first: Int, $after: String, $where: AbacAuditFilterInput, $order: [AbacAuditSortInput!]) {\n\t\taudit {\n\t\t\taudits(first: $first, after: $after, where: $where, order: $order) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\trequestedAction\n\t\t\t\t\tresourceType\n\t\t\t\t\tdecision\n\t\t\t\t\tdecisionReason\n\t\t\t\t\tevaluationTimeMs\n\t\t\t\t\ttimestamp\n\t\t\t\t\tipAddress\n\t\t\t\t\tuserAgent\n\t\t\t\t\tsessionId\n\t\t\t\t\tuser { id name }\n\t\t\t\t\tevaluatedPolicyIds\n\t\t\t\t\tmatchingPolicyIds\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": types.GetAuditsDocument,
    "\n\tquery GetAudit($id: UUID!) {\n\t\taudit {\n\t\t\taudit(id: $id) {\n\t\t\t\tid\n\t\t\t\trequestedAction\n\t\t\t\tresourceType\n\t\t\t\tdecision\n\t\t\t\tdecisionReason\n\t\t\t\tevaluationTimeMs\n\t\t\t\ttimestamp\n\t\t\t\tipAddress\n\t\t\t\tuserAgent\n\t\t\t\tsessionId\n\t\t\t\tuser { id name }\n\t\t\t\tevaluatedPolicyIds\n\t\t\t\tmatchingPolicyIds\n\t\t\t}\n\t\t}\n\t}\n": types.GetAuditDocument,
    "\n\tquery GetCollections {\n\t\tcollections {\n\t\t\tcollectionsData {\n\t\t\t\tnodes {\n\t\t\t\t\tid name slug color description entryCount\n\t\t\t\t\tisLocalized defaultLocale createdAt\n\t\t\t\t\ticon { id url filename }\n\t\t\t\t\tfields { id }\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetCollectionsDocument,
    "\n\tquery CollectionsCombobox($search: String) {\n\t\tcollections {\n\t\t\tcollectionsData(first: 20, where: { name: { contains: $search } }) {\n\t\t\t\tnodes { id name slug }\n\t\t\t}\n\t\t}\n\t}\n": types.CollectionsComboboxDocument,
    "\n\tquery GetCollection($slug: String) {\n\t\tcollections {\n\t\t\tcollectionData(slug: $slug) {\n\t\t\t\tid name slug color description entryCount\n\t\t\t\tisLocalized defaultLocale supportedLocales createdAt updatedAt\n\t\t\t\ticon { id url filename }\n\t\t\t\tfields {\n\t\t\t\t\tid name label dataType isRequired isUnique\n\t\t\t\t\tdefaultValue description helpText relatedCollectionId \n\t\t\t\t\trelatedCollection {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\tdefaultLocale\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tentryCount\n\t\t\t\t\t\tid\n\t\t\t\t\t\tisLocalized\n\t\t\t\t\t\tname\n\t\t\t\t\t\tslug\n\t\t\t\t\t\tsupportedLocales\n\t\t\t\t\t\tupdatedAt\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetCollectionDocument,
    "\n\tmutation CreateCollection($input: CreateCollectionInput!) {\n\t\tcollections {\n\t\t\tcreate(input: $input) { id slug }\n\t\t}\n\t}\n": types.CreateCollectionDocument,
    "\n\tmutation DeleteCollection($id: UUID!) {\n\t\tcollections {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n": types.DeleteCollectionDocument,
    "\n\tmutation UpdateCollection($input: UpdateCollectionInput!) {\n\t\tcollections {\n\t\t\tupdate(input: $input) { id slug }\n\t\t}\n\t}\n": types.UpdateCollectionDocument,
    "\n\tquery GetPolicies($first: Int, $after: String, $where: AbacPolicyFilterInput) {\n\t\tpolicy {\n\t\t\tpolicies(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name description actionType effect resourceType isActive priority ruleConnector createdAt\n\t\t\t\t\trules { id attributePath operator \texpectedStringValue expectedNumberValue expectedBooleanValue expectedDateTimeValue expectedUuidValue expectedArrayValue\n\tcontextReferencePath isActive order description }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": types.GetPoliciesDocument,
    "\n\tquery GetPolicy($id: UUID) {\n\t\tpolicy {\n\t\t\tpolicy(id: $id) {\n\t\t\t\tid name description actionType effect resourceType\n\t\t\t\tisActive priority ruleConnector createdAt updatedAt\n\t\t\t\trules { id attributePath operator \texpectedStringValue expectedNumberValue expectedBooleanValue expectedDateTimeValue expectedUuidValue expectedArrayValue\n\tcontextReferencePath isActive order description }\n\t\t\t}\n\t\t}\n\t}\n": types.GetPolicyDocument,
    "\n\tmutation CreatePolicy($input: CreatePolicyInput!) {\n\t\tpolicy {\n\t\t\tcreate(input: $input) { id name }\n\t\t}\n\t}\n": types.CreatePolicyDocument,
    "\n\tmutation UpdatePolicy($input: UpdatePolicyInput!) {\n\t\tpolicy {\n\t\t\tupdate(input: $input) { id name }\n\t\t}\n\t}\n": types.UpdatePolicyDocument,
    "\n\tmutation DeletePolicy($id: UUID!) {\n\t\tpolicy { delete(id: $id) }\n\t}\n": types.DeletePolicyDocument,
    "\n\tquery PoliciesForCombobox($first: Int, $where: AbacPolicyFilterInput) {\n\t\tpolicy {\n\t\t\tpolicies(first: $first, where: $where) {\n\t\t\t\tnodes { id name effect resourceType actionType }\n\t\t\t}\n\t\t}\n\t}\n": types.PoliciesForComboboxDocument,
    "\n\tquery GetRoles($first: Int, $after: String, $where: RoleFilterInput) {\n\t\troles {\n\t\t\troles(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name description creationTime lastEditTime\n\t\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name actionType effect resourceType description } }\n\t\t\t\t\tusers { id assignedAt expiresAt role { id name } }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": types.GetRolesDocument,
    "\n\tquery GetRole($id: UUID) {\n\t\troles {\n\t\t\trole(id: $id) {\n\t\t\t\tid name description creationTime lastEditTime\n\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name actionType effect resourceType description } }\n\t\t\t\tusers { id assignedAt expiresAt role { id name } }\n\t\t\t}\n\t\t}\n\t}\n": types.GetRoleDocument,
    "\n\tmutation CreateRole($input: CreateRoleInput!) {\n\t\troles { create(input: $input) { id name } }\n\t}\n": types.CreateRoleDocument,
    "\n\tmutation UpdateRole($input: UpdateRoleInput!) {\n\t\troles { update(input: $input) { id name } }\n\t}\n": types.UpdateRoleDocument,
    "\n\tmutation DeleteRole($id: UUID!) {\n\t\troles { delete(id: $id) }\n\t}\n": types.DeleteRoleDocument,
    "\n\tmutation AssignPolicyToRole($input: AssignPolicyToRoleInput!) {\n\t\troles { assignPolicy(input: $input) }\n\t}\n": types.AssignPolicyToRoleDocument,
    "\n\tmutation UnassignPolicyFromRole($policyId: UUID!, $roleId: UUID!) {\n\t\troles { unassignPolicy(policyId: $policyId, roleId: $roleId) }\n\t}\n": types.UnassignPolicyFromRoleDocument,
    "\n\tquery RolesForCombobox($first: Int, $where: RoleFilterInput) {\n\t\troles {\n\t\t\troles(first: $first, where: $where) {\n\t\t\t\tnodes { id name description }\n\t\t\t}\n\t\t}\n\t}\n": types.RolesForComboboxDocument,
    "\n\tquery GetUsers($first: Int, $after: String, $where: UserFilterInput) {\n\t\tusers {\n\t\t\tusers(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name status creationTime lastLoginTime lastEditTime\n\t\t\t\t\troles { id role { id name } }\n\t\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name effect resourceType actionType } }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n": types.GetUsersDocument,
    "\n\tquery GetUser($id: UUID) {\n\t\tusers {\n\t\t\tuser(id: $id) {\n\t\t\t\tid name status creationTime lastLoginTime lastEditTime\n\t\t\t\troles { id role {id name} assignedAt expiresAt }\n\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name effect resourceType actionType } }\n\t\t\t}\n\t\t}\n\t}\n": types.GetUserDocument,
    "\n\tmutation CreateUser($input: CreateUserInput!) {\n\t\tusers {\n\t\t\tcreate(input: $input) { id name }\n\t\t}\n\t}\n": types.CreateUserDocument,
    "\n\tmutation UpdateUser($input: UpdateUserInput!) {\n\t\tusers {\n\t\t\tupdate(input: $input) { id name }\n\t\t}\n\t}\n": types.UpdateUserDocument,
    "\n\tmutation DeleteUser($id: UUID!) {\n\t\tusers { delete(id: $id) }\n\t}\n": types.DeleteUserDocument,
    "\n\tmutation AssignRole($input: AssignRoleInput!) {\n\t\tusers { assignRole(input: $input) }\n\t}\n": types.AssignRoleDocument,
    "\n\tmutation UnassignRole($userId: UUID!, $roleId: UUID!) {\n\t\tusers { unassignRole(userId: $userId, roleId: $roleId) }\n\t}\n": types.UnassignRoleDocument,
    "\n\tmutation ActivateUser($id: UUID!) { users { activate(id: $id) { id status } } }\n": types.ActivateUserDocument,
    "\n\tmutation DeactivateUser($id: UUID!) { users { deactivate(id: $id) { id status } } }\n": types.DeactivateUserDocument,
    "\n\tmutation ChangePassword($input: ChangePasswordInput!) {\n\t\tusers { changePassword(input: $input) }\n\t}\n": types.ChangePasswordDocument,
    "\n\tmutation AssignPolicyToUser($input: AssignPolicyToUserInput!) {\n\t\tusers { assignPolicy(input: $input) }\n\t}\n": types.AssignPolicyToUserDocument,
    "\n\tmutation UnassignPolicyFromUser($policyId: UUID!, $userId: UUID!) {\n\t\tusers { unassignPolicy(policyId: $policyId, userId: $userId) }\n\t}\n": types.UnassignPolicyFromUserDocument,
    "\n\tmutation Login($name: String!, $password: String!) {\n\t\tauth {\n\t\t\tlogin(name: $name, password: $password) {\n\t\t\t\taccessToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\trefreshToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\troles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\trole {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tpolicies {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tpolicies {\n\t\t\t\t\t\tid\n\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.LoginDocument,
    "\n\tquery Me {\n\t\tauth {\n\t\t\tme {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tcreationTime\n\t\t\t\tlastLoginTime\n\t\t\t\troles {\n\t\t\t\t\tid\n\t\t\t\t\tassignedAt\n\t\t\t\t\texpiresAt\n\t\t\t\t\trole {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tpolicies {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpolicies {\n\t\t\t\t\tid\n\t\t\t\t\texpiresAt\n\t\t\t\t\tpolicy {\n\t\t\t\t\t\tresourceType\n\t\t\t\t\t\tactionType\n\t\t\t\t\t\teffect\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.MeDocument,
    "\n\tmutation Refresh($refreshToken: String!) {\n\t\tauth {\n\t\t\trefresh(refreshToken: $refreshToken) {\n\t\t\t\taccessToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\trefreshToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.RefreshDocument,
    "\n\tmutation Logout {\n\t\tauth {\n\t\t\tlogout {\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n": types.LogoutDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetApiKeys($first: Int, $after: String) {\n\t\tapiKeys {\n\t\t\tapiKeys(first: $first, after: $after) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name keyPrefix isActive createdAt updatedAt expiresAt lastUsedAt\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetApiKeys($first: Int, $after: String) {\n\t\tapiKeys {\n\t\t\tapiKeys(first: $first, after: $after) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name keyPrefix isActive createdAt updatedAt expiresAt lastUsedAt\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetApiKey($id: UUID!) {\n\t\tapiKeys {\n\t\t\tapiKey(id: $id) {\n\t\t\t\tid name keyPrefix isActive createdAt updatedAt expiresAt lastUsedAt\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetApiKey($id: UUID!) {\n\t\tapiKeys {\n\t\t\tapiKey(id: $id) {\n\t\t\t\tid name keyPrefix isActive createdAt updatedAt expiresAt lastUsedAt\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateApiKey($input: CreateApiKeyInput!) {\n\t\tapiKeys {\n\t\t\tcreateApiKey(input: $input) {\n\t\t\t\tapiKey { id }\n\t\t\t\tkey\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateApiKey($input: CreateApiKeyInput!) {\n\t\tapiKeys {\n\t\t\tcreateApiKey(input: $input) {\n\t\t\t\tapiKey { id }\n\t\t\t\tkey\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateApiKey($input: UpdateApiKeyInput!) {\n\t\tapiKeys {\n\t\t\tupdateApiKey(input: $input) { id name isActive }\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateApiKey($input: UpdateApiKeyInput!) {\n\t\tapiKeys {\n\t\t\tupdateApiKey(input: $input) { id name isActive }\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation RevokeApiKey($id: UUID!) {\n\t\tapiKeys {\n\t\t\trevokeApiKey(id: $id) { id isActive }\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation RevokeApiKey($id: UUID!) {\n\t\tapiKeys {\n\t\t\trevokeApiKey(id: $id) { id isActive }\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteApiKey($id: UUID!) {\n\t\tapiKeys { deleteApiKey(id: $id) }\n\t}\n"): (typeof documents)["\n\tmutation DeleteApiKey($id: UUID!) {\n\t\tapiKeys { deleteApiKey(id: $id) }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetAssets($first: Int, $after: String) {\n\t\tassets {\n\t\t\tassets(first: $first, after: $after) {\n\t\t\t\tnodes {\n\t\t\t\t\tid filename mimeType fileSize url alt caption isPublic uploadedAt\n\t\t\t\t\tuploadedByUser { id name }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetAssets($first: Int, $after: String) {\n\t\tassets {\n\t\t\tassets(first: $first, after: $after) {\n\t\t\t\tnodes {\n\t\t\t\t\tid filename mimeType fileSize url alt caption isPublic uploadedAt\n\t\t\t\t\tuploadedByUser { id name }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery AssetsCombobox($search: String, $first: Int) {\n\t\tassets {\n\t\t\tassets(first: $first, where: {\n\t\t\t\tor: [\n\t\t\t\t\t{ filename: { contains: $search } }\n\t\t\t\t\t{ caption: { contains: $search } }\n\t\t\t\t]\n\t\t\t}) {\n\t\t\t\tnodes { id filename caption }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery AssetsCombobox($search: String, $first: Int) {\n\t\tassets {\n\t\t\tassets(first: $first, where: {\n\t\t\t\tor: [\n\t\t\t\t\t{ filename: { contains: $search } }\n\t\t\t\t\t{ caption: { contains: $search } }\n\t\t\t\t]\n\t\t\t}) {\n\t\t\t\tnodes { id filename caption }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateAsset($input: UpdateAssetInput!) {\n\t\tassets {\n\t\t\tupdate(input: $input) { id filename alt caption isPublic }\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateAsset($input: UpdateAssetInput!) {\n\t\tassets {\n\t\t\tupdate(input: $input) { id filename alt caption isPublic }\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteAsset($id: UUID!) {\n\t\tassets {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteAsset($id: UUID!) {\n\t\tassets {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetAudits($first: Int, $after: String, $where: AbacAuditFilterInput, $order: [AbacAuditSortInput!]) {\n\t\taudit {\n\t\t\taudits(first: $first, after: $after, where: $where, order: $order) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\trequestedAction\n\t\t\t\t\tresourceType\n\t\t\t\t\tdecision\n\t\t\t\t\tdecisionReason\n\t\t\t\t\tevaluationTimeMs\n\t\t\t\t\ttimestamp\n\t\t\t\t\tipAddress\n\t\t\t\t\tuserAgent\n\t\t\t\t\tsessionId\n\t\t\t\t\tuser { id name }\n\t\t\t\t\tevaluatedPolicyIds\n\t\t\t\t\tmatchingPolicyIds\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetAudits($first: Int, $after: String, $where: AbacAuditFilterInput, $order: [AbacAuditSortInput!]) {\n\t\taudit {\n\t\t\taudits(first: $first, after: $after, where: $where, order: $order) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\trequestedAction\n\t\t\t\t\tresourceType\n\t\t\t\t\tdecision\n\t\t\t\t\tdecisionReason\n\t\t\t\t\tevaluationTimeMs\n\t\t\t\t\ttimestamp\n\t\t\t\t\tipAddress\n\t\t\t\t\tuserAgent\n\t\t\t\t\tsessionId\n\t\t\t\t\tuser { id name }\n\t\t\t\t\tevaluatedPolicyIds\n\t\t\t\t\tmatchingPolicyIds\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetAudit($id: UUID!) {\n\t\taudit {\n\t\t\taudit(id: $id) {\n\t\t\t\tid\n\t\t\t\trequestedAction\n\t\t\t\tresourceType\n\t\t\t\tdecision\n\t\t\t\tdecisionReason\n\t\t\t\tevaluationTimeMs\n\t\t\t\ttimestamp\n\t\t\t\tipAddress\n\t\t\t\tuserAgent\n\t\t\t\tsessionId\n\t\t\t\tuser { id name }\n\t\t\t\tevaluatedPolicyIds\n\t\t\t\tmatchingPolicyIds\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetAudit($id: UUID!) {\n\t\taudit {\n\t\t\taudit(id: $id) {\n\t\t\t\tid\n\t\t\t\trequestedAction\n\t\t\t\tresourceType\n\t\t\t\tdecision\n\t\t\t\tdecisionReason\n\t\t\t\tevaluationTimeMs\n\t\t\t\ttimestamp\n\t\t\t\tipAddress\n\t\t\t\tuserAgent\n\t\t\t\tsessionId\n\t\t\t\tuser { id name }\n\t\t\t\tevaluatedPolicyIds\n\t\t\t\tmatchingPolicyIds\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetCollections {\n\t\tcollections {\n\t\t\tcollectionsData {\n\t\t\t\tnodes {\n\t\t\t\t\tid name slug color description entryCount\n\t\t\t\t\tisLocalized defaultLocale createdAt\n\t\t\t\t\ticon { id url filename }\n\t\t\t\t\tfields { id }\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCollections {\n\t\tcollections {\n\t\t\tcollectionsData {\n\t\t\t\tnodes {\n\t\t\t\t\tid name slug color description entryCount\n\t\t\t\t\tisLocalized defaultLocale createdAt\n\t\t\t\t\ticon { id url filename }\n\t\t\t\t\tfields { id }\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery CollectionsCombobox($search: String) {\n\t\tcollections {\n\t\t\tcollectionsData(first: 20, where: { name: { contains: $search } }) {\n\t\t\t\tnodes { id name slug }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery CollectionsCombobox($search: String) {\n\t\tcollections {\n\t\t\tcollectionsData(first: 20, where: { name: { contains: $search } }) {\n\t\t\t\tnodes { id name slug }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetCollection($slug: String) {\n\t\tcollections {\n\t\t\tcollectionData(slug: $slug) {\n\t\t\t\tid name slug color description entryCount\n\t\t\t\tisLocalized defaultLocale supportedLocales createdAt updatedAt\n\t\t\t\ticon { id url filename }\n\t\t\t\tfields {\n\t\t\t\t\tid name label dataType isRequired isUnique\n\t\t\t\t\tdefaultValue description helpText relatedCollectionId \n\t\t\t\t\trelatedCollection {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\tdefaultLocale\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tentryCount\n\t\t\t\t\t\tid\n\t\t\t\t\t\tisLocalized\n\t\t\t\t\t\tname\n\t\t\t\t\t\tslug\n\t\t\t\t\t\tsupportedLocales\n\t\t\t\t\t\tupdatedAt\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCollection($slug: String) {\n\t\tcollections {\n\t\t\tcollectionData(slug: $slug) {\n\t\t\t\tid name slug color description entryCount\n\t\t\t\tisLocalized defaultLocale supportedLocales createdAt updatedAt\n\t\t\t\ticon { id url filename }\n\t\t\t\tfields {\n\t\t\t\t\tid name label dataType isRequired isUnique\n\t\t\t\t\tdefaultValue description helpText relatedCollectionId \n\t\t\t\t\trelatedCollection {\n\t\t\t\t\t\tcolor\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\tdefaultLocale\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tentryCount\n\t\t\t\t\t\tid\n\t\t\t\t\t\tisLocalized\n\t\t\t\t\t\tname\n\t\t\t\t\t\tslug\n\t\t\t\t\t\tsupportedLocales\n\t\t\t\t\t\tupdatedAt\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateCollection($input: CreateCollectionInput!) {\n\t\tcollections {\n\t\t\tcreate(input: $input) { id slug }\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateCollection($input: CreateCollectionInput!) {\n\t\tcollections {\n\t\t\tcreate(input: $input) { id slug }\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteCollection($id: UUID!) {\n\t\tcollections {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteCollection($id: UUID!) {\n\t\tcollections {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateCollection($input: UpdateCollectionInput!) {\n\t\tcollections {\n\t\t\tupdate(input: $input) { id slug }\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateCollection($input: UpdateCollectionInput!) {\n\t\tcollections {\n\t\t\tupdate(input: $input) { id slug }\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetPolicies($first: Int, $after: String, $where: AbacPolicyFilterInput) {\n\t\tpolicy {\n\t\t\tpolicies(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name description actionType effect resourceType isActive priority ruleConnector createdAt\n\t\t\t\t\trules { id attributePath operator \texpectedStringValue expectedNumberValue expectedBooleanValue expectedDateTimeValue expectedUuidValue expectedArrayValue\n\tcontextReferencePath isActive order description }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetPolicies($first: Int, $after: String, $where: AbacPolicyFilterInput) {\n\t\tpolicy {\n\t\t\tpolicies(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name description actionType effect resourceType isActive priority ruleConnector createdAt\n\t\t\t\t\trules { id attributePath operator \texpectedStringValue expectedNumberValue expectedBooleanValue expectedDateTimeValue expectedUuidValue expectedArrayValue\n\tcontextReferencePath isActive order description }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetPolicy($id: UUID) {\n\t\tpolicy {\n\t\t\tpolicy(id: $id) {\n\t\t\t\tid name description actionType effect resourceType\n\t\t\t\tisActive priority ruleConnector createdAt updatedAt\n\t\t\t\trules { id attributePath operator \texpectedStringValue expectedNumberValue expectedBooleanValue expectedDateTimeValue expectedUuidValue expectedArrayValue\n\tcontextReferencePath isActive order description }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetPolicy($id: UUID) {\n\t\tpolicy {\n\t\t\tpolicy(id: $id) {\n\t\t\t\tid name description actionType effect resourceType\n\t\t\t\tisActive priority ruleConnector createdAt updatedAt\n\t\t\t\trules { id attributePath operator \texpectedStringValue expectedNumberValue expectedBooleanValue expectedDateTimeValue expectedUuidValue expectedArrayValue\n\tcontextReferencePath isActive order description }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreatePolicy($input: CreatePolicyInput!) {\n\t\tpolicy {\n\t\t\tcreate(input: $input) { id name }\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreatePolicy($input: CreatePolicyInput!) {\n\t\tpolicy {\n\t\t\tcreate(input: $input) { id name }\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdatePolicy($input: UpdatePolicyInput!) {\n\t\tpolicy {\n\t\t\tupdate(input: $input) { id name }\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdatePolicy($input: UpdatePolicyInput!) {\n\t\tpolicy {\n\t\t\tupdate(input: $input) { id name }\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeletePolicy($id: UUID!) {\n\t\tpolicy { delete(id: $id) }\n\t}\n"): (typeof documents)["\n\tmutation DeletePolicy($id: UUID!) {\n\t\tpolicy { delete(id: $id) }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery PoliciesForCombobox($first: Int, $where: AbacPolicyFilterInput) {\n\t\tpolicy {\n\t\t\tpolicies(first: $first, where: $where) {\n\t\t\t\tnodes { id name effect resourceType actionType }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery PoliciesForCombobox($first: Int, $where: AbacPolicyFilterInput) {\n\t\tpolicy {\n\t\t\tpolicies(first: $first, where: $where) {\n\t\t\t\tnodes { id name effect resourceType actionType }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetRoles($first: Int, $after: String, $where: RoleFilterInput) {\n\t\troles {\n\t\t\troles(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name description creationTime lastEditTime\n\t\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name actionType effect resourceType description } }\n\t\t\t\t\tusers { id assignedAt expiresAt role { id name } }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetRoles($first: Int, $after: String, $where: RoleFilterInput) {\n\t\troles {\n\t\t\troles(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name description creationTime lastEditTime\n\t\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name actionType effect resourceType description } }\n\t\t\t\t\tusers { id assignedAt expiresAt role { id name } }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetRole($id: UUID) {\n\t\troles {\n\t\t\trole(id: $id) {\n\t\t\t\tid name description creationTime lastEditTime\n\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name actionType effect resourceType description } }\n\t\t\t\tusers { id assignedAt expiresAt role { id name } }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetRole($id: UUID) {\n\t\troles {\n\t\t\trole(id: $id) {\n\t\t\t\tid name description creationTime lastEditTime\n\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name actionType effect resourceType description } }\n\t\t\t\tusers { id assignedAt expiresAt role { id name } }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateRole($input: CreateRoleInput!) {\n\t\troles { create(input: $input) { id name } }\n\t}\n"): (typeof documents)["\n\tmutation CreateRole($input: CreateRoleInput!) {\n\t\troles { create(input: $input) { id name } }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateRole($input: UpdateRoleInput!) {\n\t\troles { update(input: $input) { id name } }\n\t}\n"): (typeof documents)["\n\tmutation UpdateRole($input: UpdateRoleInput!) {\n\t\troles { update(input: $input) { id name } }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteRole($id: UUID!) {\n\t\troles { delete(id: $id) }\n\t}\n"): (typeof documents)["\n\tmutation DeleteRole($id: UUID!) {\n\t\troles { delete(id: $id) }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation AssignPolicyToRole($input: AssignPolicyToRoleInput!) {\n\t\troles { assignPolicy(input: $input) }\n\t}\n"): (typeof documents)["\n\tmutation AssignPolicyToRole($input: AssignPolicyToRoleInput!) {\n\t\troles { assignPolicy(input: $input) }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UnassignPolicyFromRole($policyId: UUID!, $roleId: UUID!) {\n\t\troles { unassignPolicy(policyId: $policyId, roleId: $roleId) }\n\t}\n"): (typeof documents)["\n\tmutation UnassignPolicyFromRole($policyId: UUID!, $roleId: UUID!) {\n\t\troles { unassignPolicy(policyId: $policyId, roleId: $roleId) }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery RolesForCombobox($first: Int, $where: RoleFilterInput) {\n\t\troles {\n\t\t\troles(first: $first, where: $where) {\n\t\t\t\tnodes { id name description }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery RolesForCombobox($first: Int, $where: RoleFilterInput) {\n\t\troles {\n\t\t\troles(first: $first, where: $where) {\n\t\t\t\tnodes { id name description }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetUsers($first: Int, $after: String, $where: UserFilterInput) {\n\t\tusers {\n\t\t\tusers(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name status creationTime lastLoginTime lastEditTime\n\t\t\t\t\troles { id role { id name } }\n\t\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name effect resourceType actionType } }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUsers($first: Int, $after: String, $where: UserFilterInput) {\n\t\tusers {\n\t\t\tusers(first: $first, after: $after, where: $where) {\n\t\t\t\tnodes {\n\t\t\t\t\tid name status creationTime lastLoginTime lastEditTime\n\t\t\t\t\troles { id role { id name } }\n\t\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name effect resourceType actionType } }\n\t\t\t\t}\n\t\t\t\tpageInfo { hasNextPage endCursor }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetUser($id: UUID) {\n\t\tusers {\n\t\t\tuser(id: $id) {\n\t\t\t\tid name status creationTime lastLoginTime lastEditTime\n\t\t\t\troles { id role {id name} assignedAt expiresAt }\n\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name effect resourceType actionType } }\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUser($id: UUID) {\n\t\tusers {\n\t\t\tuser(id: $id) {\n\t\t\t\tid name status creationTime lastLoginTime lastEditTime\n\t\t\t\troles { id role {id name} assignedAt expiresAt }\n\t\t\t\tpolicies { id assignedAt expiresAt reason policy { id name effect resourceType actionType } }\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateUser($input: CreateUserInput!) {\n\t\tusers {\n\t\t\tcreate(input: $input) { id name }\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateUser($input: CreateUserInput!) {\n\t\tusers {\n\t\t\tcreate(input: $input) { id name }\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateUser($input: UpdateUserInput!) {\n\t\tusers {\n\t\t\tupdate(input: $input) { id name }\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateUser($input: UpdateUserInput!) {\n\t\tusers {\n\t\t\tupdate(input: $input) { id name }\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteUser($id: UUID!) {\n\t\tusers { delete(id: $id) }\n\t}\n"): (typeof documents)["\n\tmutation DeleteUser($id: UUID!) {\n\t\tusers { delete(id: $id) }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation AssignRole($input: AssignRoleInput!) {\n\t\tusers { assignRole(input: $input) }\n\t}\n"): (typeof documents)["\n\tmutation AssignRole($input: AssignRoleInput!) {\n\t\tusers { assignRole(input: $input) }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UnassignRole($userId: UUID!, $roleId: UUID!) {\n\t\tusers { unassignRole(userId: $userId, roleId: $roleId) }\n\t}\n"): (typeof documents)["\n\tmutation UnassignRole($userId: UUID!, $roleId: UUID!) {\n\t\tusers { unassignRole(userId: $userId, roleId: $roleId) }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation ActivateUser($id: UUID!) { users { activate(id: $id) { id status } } }\n"): (typeof documents)["\n\tmutation ActivateUser($id: UUID!) { users { activate(id: $id) { id status } } }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeactivateUser($id: UUID!) { users { deactivate(id: $id) { id status } } }\n"): (typeof documents)["\n\tmutation DeactivateUser($id: UUID!) { users { deactivate(id: $id) { id status } } }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation ChangePassword($input: ChangePasswordInput!) {\n\t\tusers { changePassword(input: $input) }\n\t}\n"): (typeof documents)["\n\tmutation ChangePassword($input: ChangePasswordInput!) {\n\t\tusers { changePassword(input: $input) }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation AssignPolicyToUser($input: AssignPolicyToUserInput!) {\n\t\tusers { assignPolicy(input: $input) }\n\t}\n"): (typeof documents)["\n\tmutation AssignPolicyToUser($input: AssignPolicyToUserInput!) {\n\t\tusers { assignPolicy(input: $input) }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UnassignPolicyFromUser($policyId: UUID!, $userId: UUID!) {\n\t\tusers { unassignPolicy(policyId: $policyId, userId: $userId) }\n\t}\n"): (typeof documents)["\n\tmutation UnassignPolicyFromUser($policyId: UUID!, $userId: UUID!) {\n\t\tusers { unassignPolicy(policyId: $policyId, userId: $userId) }\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation Login($name: String!, $password: String!) {\n\t\tauth {\n\t\t\tlogin(name: $name, password: $password) {\n\t\t\t\taccessToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\trefreshToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\troles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\trole {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tpolicies {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tpolicies {\n\t\t\t\t\t\tid\n\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Login($name: String!, $password: String!) {\n\t\tauth {\n\t\t\tlogin(name: $name, password: $password) {\n\t\t\t\taccessToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\trefreshToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\tuser {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tstatus\n\t\t\t\t\troles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\trole {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tpolicies {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tpolicies {\n\t\t\t\t\t\tid\n\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Me {\n\t\tauth {\n\t\t\tme {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tcreationTime\n\t\t\t\tlastLoginTime\n\t\t\t\troles {\n\t\t\t\t\tid\n\t\t\t\t\tassignedAt\n\t\t\t\t\texpiresAt\n\t\t\t\t\trole {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tpolicies {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpolicies {\n\t\t\t\t\tid\n\t\t\t\t\texpiresAt\n\t\t\t\t\tpolicy {\n\t\t\t\t\t\tresourceType\n\t\t\t\t\t\tactionType\n\t\t\t\t\t\teffect\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Me {\n\t\tauth {\n\t\t\tme {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tcreationTime\n\t\t\t\tlastLoginTime\n\t\t\t\troles {\n\t\t\t\t\tid\n\t\t\t\t\tassignedAt\n\t\t\t\t\texpiresAt\n\t\t\t\t\trole {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\tpolicies {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tassignedAt\n\t\t\t\t\t\t\texpiresAt\n\t\t\t\t\t\t\tpolicy {\n\t\t\t\t\t\t\t\tresourceType\n\t\t\t\t\t\t\t\tactionType\n\t\t\t\t\t\t\t\teffect\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpolicies {\n\t\t\t\t\tid\n\t\t\t\t\texpiresAt\n\t\t\t\t\tpolicy {\n\t\t\t\t\t\tresourceType\n\t\t\t\t\t\tactionType\n\t\t\t\t\t\teffect\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation Refresh($refreshToken: String!) {\n\t\tauth {\n\t\t\trefresh(refreshToken: $refreshToken) {\n\t\t\t\taccessToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\trefreshToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Refresh($refreshToken: String!) {\n\t\tauth {\n\t\t\trefresh(refreshToken: $refreshToken) {\n\t\t\t\taccessToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t\trefreshToken {\n\t\t\t\t\ttokenValue\n\t\t\t\t\texpiresAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation Logout {\n\t\tauth {\n\t\t\tlogout {\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Logout {\n\t\tauth {\n\t\t\tlogout {\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;