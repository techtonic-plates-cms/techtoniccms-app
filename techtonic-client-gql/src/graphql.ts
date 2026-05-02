/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AbacAuditFilterInput = {
  and?: InputMaybe<Array<AbacAuditFilterInput>>;
  decision?: InputMaybe<PermissionEffectOperationFilterInput>;
  decisionReason?: InputMaybe<StringOperationFilterInput>;
  evaluatedPolicyIds?: InputMaybe<ListUuidOperationFilterInput>;
  evaluationTimeMs?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  ipAddress?: InputMaybe<StringOperationFilterInput>;
  matchingPolicyIds?: InputMaybe<ListUuidOperationFilterInput>;
  or?: InputMaybe<Array<AbacAuditFilterInput>>;
  requestContext?: InputMaybe<StringOperationFilterInput>;
  requestedAction?: InputMaybe<PermissionActionOperationFilterInput>;
  resourceId?: InputMaybe<UuidOperationFilterInput>;
  resourceType?: InputMaybe<BaseResourceOperationFilterInput>;
  sessionId?: InputMaybe<StringOperationFilterInput>;
  timestamp?: InputMaybe<DateTimeOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userAgent?: InputMaybe<StringOperationFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type AbacAuditSortInput = {
  decision?: InputMaybe<SortEnumType>;
  decisionReason?: InputMaybe<SortEnumType>;
  evaluationTimeMs?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  ipAddress?: InputMaybe<SortEnumType>;
  requestContext?: InputMaybe<SortEnumType>;
  requestedAction?: InputMaybe<SortEnumType>;
  resourceId?: InputMaybe<SortEnumType>;
  resourceType?: InputMaybe<SortEnumType>;
  sessionId?: InputMaybe<SortEnumType>;
  timestamp?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userAgent?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
};

export type AbacPolicyFilterInput = {
  actionType?: InputMaybe<PermissionActionOperationFilterInput>;
  and?: InputMaybe<Array<AbacPolicyFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdBy?: InputMaybe<UuidOperationFilterInput>;
  createdByUser?: InputMaybe<UserFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  effect?: InputMaybe<PermissionEffectOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  lastEvaluatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AbacPolicyFilterInput>>;
  priority?: InputMaybe<IntOperationFilterInput>;
  resourceType?: InputMaybe<BaseResourceOperationFilterInput>;
  rolePolicies?: InputMaybe<ListFilterInputTypeOfRolePolicyFilterInput>;
  ruleConnector?: InputMaybe<LogicalOperatorOperationFilterInput>;
  rules?: InputMaybe<ListFilterInputTypeOfAbacPolicyRuleFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  userPolicies?: InputMaybe<ListFilterInputTypeOfUserPolicyFilterInput>;
};

export type AbacPolicyRuleFilterInput = {
  and?: InputMaybe<Array<AbacPolicyRuleFilterInput>>;
  attributePath?: InputMaybe<AttributePathOperationFilterInput>;
  contextReferencePath?: InputMaybe<NullableOfAttributePathOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  expectedArrayValue?: InputMaybe<ListStringOperationFilterInput>;
  expectedBooleanValue?: InputMaybe<BooleanOperationFilterInput>;
  expectedDateTimeValue?: InputMaybe<DateTimeOperationFilterInput>;
  expectedNumberValue?: InputMaybe<FloatOperationFilterInput>;
  expectedStringValue?: InputMaybe<StringOperationFilterInput>;
  expectedUuidValue?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  operator?: InputMaybe<OperatorTypeOperationFilterInput>;
  or?: InputMaybe<Array<AbacPolicyRuleFilterInput>>;
  order?: InputMaybe<IntOperationFilterInput>;
  policy?: InputMaybe<AbacPolicyFilterInput>;
  policyId?: InputMaybe<UuidOperationFilterInput>;
  valueType?: InputMaybe<ValueTypeOperationFilterInput>;
};

export type AbacPolicySortInput = {
  actionType?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdBy?: InputMaybe<SortEnumType>;
  createdByUser?: InputMaybe<UserSortInput>;
  description?: InputMaybe<SortEnumType>;
  effect?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  lastEvaluatedAt?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  priority?: InputMaybe<SortEnumType>;
  resourceType?: InputMaybe<SortEnumType>;
  ruleConnector?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type ApiKey = {
  __typename?: 'ApiKey';
  createdAt: Scalars['DateTime']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  keyPrefix: Scalars['String']['output'];
  lastUsedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type ApiKeyFilterInput = {
  and?: InputMaybe<Array<ApiKeyFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  expiresAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  keyHash?: InputMaybe<StringOperationFilterInput>;
  keyPrefix?: InputMaybe<StringOperationFilterInput>;
  lastUsedAt?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ApiKeyFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type ApiKeyMutation = {
  __typename?: 'ApiKeyMutation';
  createApiKey: CreateApiKeyPayload;
  deleteApiKey: Scalars['Boolean']['output'];
  revokeApiKey: ApiKey;
  updateApiKey: ApiKey;
};


export type ApiKeyMutationCreateApiKeyArgs = {
  input: CreateApiKeyInput;
};


export type ApiKeyMutationDeleteApiKeyArgs = {
  id: Scalars['UUID']['input'];
};


export type ApiKeyMutationRevokeApiKeyArgs = {
  id: Scalars['UUID']['input'];
};


export type ApiKeyMutationUpdateApiKeyArgs = {
  input: UpdateApiKeyInput;
};

export type ApiKeyQuery = {
  __typename?: 'ApiKeyQuery';
  apiKey?: Maybe<ApiKey>;
  apiKeys?: Maybe<ApiKeysConnection>;
};


export type ApiKeyQueryApiKeyArgs = {
  id: Scalars['UUID']['input'];
};


export type ApiKeyQueryApiKeysArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ApiKeySortInput>>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  where?: InputMaybe<ApiKeyFilterInput>;
};

export type ApiKeySortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  expiresAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  keyHash?: InputMaybe<SortEnumType>;
  keyPrefix?: InputMaybe<SortEnumType>;
  lastUsedAt?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type ApiKeysConnection = {
  __typename?: 'ApiKeysConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ApiKeysEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ApiKey>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ApiKeysEdge = {
  __typename?: 'ApiKeysEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ApiKey;
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type Asset = {
  __typename?: 'Asset';
  alt?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  fileSize: Scalars['Int']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  mimeType: Scalars['String']['output'];
  path: Scalars['String']['output'];
  uploadedAt: Scalars['DateTime']['output'];
  uploadedBy: Scalars['ID']['output'];
  uploadedByUser?: Maybe<User>;
  url: Scalars['String']['output'];
};

export type AssetFilterInput = {
  alt?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<AssetFilterInput>>;
  caption?: InputMaybe<StringOperationFilterInput>;
  entries?: InputMaybe<ListFilterInputTypeOfEntryFilterInput>;
  fileSize?: InputMaybe<IntOperationFilterInput>;
  filename?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isPublic?: InputMaybe<BooleanOperationFilterInput>;
  mimeType?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AssetFilterInput>>;
  path?: InputMaybe<StringOperationFilterInput>;
  uploadedAt?: InputMaybe<DateTimeOperationFilterInput>;
  uploadedBy?: InputMaybe<UuidOperationFilterInput>;
  uploadedByUser?: InputMaybe<UserFilterInput>;
};

export type AssetMutation = {
  __typename?: 'AssetMutation';
  delete: Scalars['Boolean']['output'];
  update: Asset;
};


export type AssetMutationDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type AssetMutationUpdateArgs = {
  input: UpdateAssetInput;
};

export type AssetQuery = {
  __typename?: 'AssetQuery';
  asset?: Maybe<Asset>;
  assets?: Maybe<AssetsConnection>;
};


export type AssetQueryAssetArgs = {
  id: Scalars['UUID']['input'];
};


export type AssetQueryAssetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<AssetSortInput>>;
  where?: InputMaybe<AssetFilterInput>;
};

export type AssetSortInput = {
  alt?: InputMaybe<SortEnumType>;
  caption?: InputMaybe<SortEnumType>;
  fileSize?: InputMaybe<SortEnumType>;
  filename?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  mimeType?: InputMaybe<SortEnumType>;
  path?: InputMaybe<SortEnumType>;
  uploadedAt?: InputMaybe<SortEnumType>;
  uploadedBy?: InputMaybe<SortEnumType>;
  uploadedByUser?: InputMaybe<UserSortInput>;
};

/** A connection to a list of items. */
export type AssetsConnection = {
  __typename?: 'AssetsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<AssetsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Asset>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AssetsEdge = {
  __typename?: 'AssetsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Asset;
};

export type AssignPolicyToRoleInput = {
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  policyId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  roleId: Scalars['ID']['input'];
};

export type AssignPolicyToUserInput = {
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  policyId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type AssignRoleInput = {
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  roleId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export enum AttributePath {
  ActionType = 'ACTION_TYPE',
  EnvironmentCurrentTime = 'ENVIRONMENT_CURRENT_TIME',
  EnvironmentIpAddress = 'ENVIRONMENT_IP_ADDRESS',
  EnvironmentUserAgent = 'ENVIRONMENT_USER_AGENT',
  ResourceApiKeyUserId = 'RESOURCE_API_KEY_USER_ID',
  ResourceAssetFileSize = 'RESOURCE_ASSET_FILE_SIZE',
  ResourceAssetId = 'RESOURCE_ASSET_ID',
  ResourceAssetMimeType = 'RESOURCE_ASSET_MIME_TYPE',
  ResourceAssetUploadedBy = 'RESOURCE_ASSET_UPLOADED_BY',
  ResourceAuditUserId = 'RESOURCE_AUDIT_USER_ID',
  ResourceCollectionCreatedBy = 'RESOURCE_COLLECTION_CREATED_BY',
  ResourceCollectionId = 'RESOURCE_COLLECTION_ID',
  ResourceCollectionIsLocalized = 'RESOURCE_COLLECTION_IS_LOCALIZED',
  ResourceCollectionSlug = 'RESOURCE_COLLECTION_SLUG',
  ResourceEntryCollectionId = 'RESOURCE_ENTRY_COLLECTION_ID',
  ResourceEntryCreatedBy = 'RESOURCE_ENTRY_CREATED_BY',
  ResourceEntryId = 'RESOURCE_ENTRY_ID',
  ResourceEntryLocale = 'RESOURCE_ENTRY_LOCALE',
  ResourceEntryPublishedAt = 'RESOURCE_ENTRY_PUBLISHED_AT',
  ResourceEntryStatus = 'RESOURCE_ENTRY_STATUS',
  ResourceUserId = 'RESOURCE_USER_ID',
  ResourceUserStatus = 'RESOURCE_USER_STATUS',
  SubjectCreatedAt = 'SUBJECT_CREATED_AT',
  SubjectId = 'SUBJECT_ID',
  SubjectRole = 'SUBJECT_ROLE',
  SubjectStatus = 'SUBJECT_STATUS'
}

export type AttributePathOperationFilterInput = {
  eq?: InputMaybe<AttributePath>;
  in?: InputMaybe<Array<AttributePath>>;
  neq?: InputMaybe<AttributePath>;
  nin?: InputMaybe<Array<AttributePath>>;
};

export type Audit = {
  __typename?: 'Audit';
  decision: PermissionEffect;
  decisionReason: Scalars['String']['output'];
  evaluatedPolicyIds?: Maybe<Array<Scalars['UUID']['output']>>;
  evaluationTimeMs: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  ipAddress?: Maybe<Scalars['String']['output']>;
  matchingPolicyIds?: Maybe<Array<Scalars['UUID']['output']>>;
  requestedAction: PermissionAction;
  resourceType: BaseResource;
  sessionId?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userAgent?: Maybe<Scalars['String']['output']>;
};

export type AuditQuery = {
  __typename?: 'AuditQuery';
  audit?: Maybe<Audit>;
  audits?: Maybe<AuditsConnection>;
};


export type AuditQueryAuditArgs = {
  id: Scalars['UUID']['input'];
};


export type AuditQueryAuditsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<AbacAuditSortInput>>;
  where?: InputMaybe<AbacAuditFilterInput>;
};

/** A connection to a list of items. */
export type AuditsConnection = {
  __typename?: 'AuditsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<AuditsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Audit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AuditsEdge = {
  __typename?: 'AuditsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Audit;
};

export type AuthMutation = {
  __typename?: 'AuthMutation';
  login: LoginPayload;
  logout: LogoutPayload;
  logoutAll: LogoutPayload;
  refresh: RefreshPayload;
};


export type AuthMutationLoginArgs = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type AuthMutationRefreshArgs = {
  refreshToken: Scalars['String']['input'];
};

export type AuthQuery = {
  __typename?: 'AuthQuery';
  me?: Maybe<User>;
  myKeys?: Maybe<MyKeysConnection>;
};


export type AuthQueryMyKeysArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ApiKeySortInput>>;
  where?: InputMaybe<ApiKeyFilterInput>;
};

export enum BaseResource {
  ApiKeys = 'API_KEYS',
  Assets = 'ASSETS',
  Audits = 'AUDITS',
  Collections = 'COLLECTIONS',
  Entries = 'ENTRIES',
  Policies = 'POLICIES',
  Roles = 'ROLES',
  Users = 'USERS',
  Wildcard = 'WILDCARD'
}

export type BaseResourceOperationFilterInput = {
  eq?: InputMaybe<BaseResource>;
  in?: InputMaybe<Array<BaseResource>>;
  neq?: InputMaybe<BaseResource>;
  nin?: InputMaybe<Array<BaseResource>>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChangePasswordInput = {
  currentPassword?: InputMaybe<Scalars['String']['input']>;
  newPassword: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type Collection = {
  __typename?: 'Collection';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  defaultLocale: Locale;
  description?: Maybe<Scalars['String']['output']>;
  entryCount: Scalars['Int']['output'];
  fields: Array<Field>;
  icon?: Maybe<Asset>;
  id: Scalars['ID']['output'];
  isLocalized: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  supportedLocales: Array<Locale>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CollectionFilterInput = {
  and?: InputMaybe<Array<CollectionFilterInput>>;
  color?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdBy?: InputMaybe<UuidOperationFilterInput>;
  createdByUser?: InputMaybe<UserFilterInput>;
  defaultLocale?: InputMaybe<LocaleOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  fields?: InputMaybe<ListFilterInputTypeOfFieldFilterInput>;
  icon?: InputMaybe<AssetFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isLocalized?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CollectionFilterInput>>;
  slug?: InputMaybe<StringOperationFilterInput>;
  supportedLocales?: InputMaybe<ListStringOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type CollectionMutation = {
  __typename?: 'CollectionMutation';
  create: Collection;
  delete: Scalars['Boolean']['output'];
  update: Collection;
};


export type CollectionMutationCreateArgs = {
  input: CreateCollectionInput;
};


export type CollectionMutationDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type CollectionMutationUpdateArgs = {
  input: UpdateCollectionInput;
};

export type CollectionQuery = {
  __typename?: 'CollectionQuery';
  collectionData?: Maybe<Collection>;
  collectionsData?: Maybe<CollectionsDataConnection>;
};


export type CollectionQueryCollectionDataArgs = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type CollectionQueryCollectionsDataArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CollectionSortInput>>;
  where?: InputMaybe<CollectionFilterInput>;
};

export type CollectionSortInput = {
  color?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdBy?: InputMaybe<SortEnumType>;
  createdByUser?: InputMaybe<UserSortInput>;
  defaultLocale?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  icon?: InputMaybe<AssetSortInput>;
  id?: InputMaybe<SortEnumType>;
  isLocalized?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  slug?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type CollectionsDataConnection = {
  __typename?: 'CollectionsDataConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CollectionsDataEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Collection>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CollectionsDataEdge = {
  __typename?: 'CollectionsDataEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Collection;
};

export type CreateApiKeyInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateApiKeyPayload = {
  __typename?: 'CreateApiKeyPayload';
  apiKey?: Maybe<ApiKey>;
  key: Scalars['String']['output'];
};

export type CreateCollectionInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  creatorPoliciesExpiresAt?: InputMaybe<Scalars['String']['input']>;
  defaultLocale?: InputMaybe<Locale>;
  description?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<FieldDefinitionInput>>;
  iconId?: InputMaybe<Scalars['ID']['input']>;
  isLocalized?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  supportedLocales?: InputMaybe<Array<Locale>>;
};

export type CreatePolicyInput = {
  actionType: PermissionAction;
  description?: InputMaybe<Scalars['String']['input']>;
  effect: PermissionEffect;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
  resourceType: BaseResource;
  ruleConnector: LogicalOperator;
  rules?: InputMaybe<Array<CreatePolicyRuleInput>>;
};

export type CreatePolicyRuleInput = {
  attributePath: AttributePath;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  operator: OperatorType;
  order?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<PolicyRuleValueInput>;
};

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  policies?: InputMaybe<PolicyAssignmentInRoleChoiceInput>;
};

export type CreateUserInput = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  policies?: InputMaybe<PolicyAssignmentChoiceInput>;
  roles?: InputMaybe<RoleAssignmentChoiceInput>;
  status?: InputMaybe<UserStatus>;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Entry = {
  __typename?: 'Entry';
  collection?: Maybe<Collection>;
  collectionId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['ID']['output'];
  data: Scalars['String']['output'];
  defaultLocale: Locale;
  id: Scalars['ID']['output'];
  locale: Locale;
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status: EntryStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type EntryFilterInput = {
  and?: InputMaybe<Array<EntryFilterInput>>;
  collection?: InputMaybe<CollectionFilterInput>;
  collectionId?: InputMaybe<UuidOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdBy?: InputMaybe<UuidOperationFilterInput>;
  createdByUser?: InputMaybe<UserFilterInput>;
  data?: InputMaybe<JsonDocumentFilterInput>;
  defaultLocale?: InputMaybe<LocaleOperationFilterInput>;
  fromRelations?: InputMaybe<ListFilterInputTypeOfEntryRelationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  locale?: InputMaybe<LocaleOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<EntryFilterInput>>;
  publishedAt?: InputMaybe<DateTimeOperationFilterInput>;
  slug?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<EntryStatusOperationFilterInput>;
  toRelations?: InputMaybe<ListFilterInputTypeOfEntryRelationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type EntryRelationFilterInput = {
  and?: InputMaybe<Array<EntryRelationFilterInput>>;
  entry?: InputMaybe<EntryFilterInput>;
  entryId?: InputMaybe<UuidOperationFilterInput>;
  field?: InputMaybe<FieldFilterInput>;
  fieldId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<EntryRelationFilterInput>>;
  targetEntry?: InputMaybe<EntryFilterInput>;
  targetEntryId?: InputMaybe<UuidOperationFilterInput>;
};

export enum EntryStatus {
  Archived = 'ARCHIVED',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type EntryStatusOperationFilterInput = {
  eq?: InputMaybe<EntryStatus>;
  in?: InputMaybe<Array<EntryStatus>>;
  neq?: InputMaybe<EntryStatus>;
  nin?: InputMaybe<Array<EntryStatus>>;
};

export type Field = {
  __typename?: 'Field';
  collection?: Maybe<Collection>;
  collectionId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  dataType: FieldDataType;
  defaultValue?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  helpText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isRequired: Scalars['Boolean']['output'];
  isUnique: Scalars['Boolean']['output'];
  label?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  relatedCollection?: Maybe<Collection>;
  relatedCollectionId?: Maybe<Scalars['UUID']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FieldConfigInput = {
  relation?: InputMaybe<RelationFieldConfigInput>;
  simple?: InputMaybe<SimpleFieldConfigInput>;
};

export enum FieldDataType {
  Asset = 'ASSET',
  Boolean = 'BOOLEAN',
  DateTime = 'DATE_TIME',
  Number = 'NUMBER',
  Object = 'OBJECT',
  Relation = 'RELATION',
  Text = 'TEXT'
}

export type FieldDataTypeOperationFilterInput = {
  eq?: InputMaybe<FieldDataType>;
  in?: InputMaybe<Array<FieldDataType>>;
  neq?: InputMaybe<FieldDataType>;
  nin?: InputMaybe<Array<FieldDataType>>;
};

export type FieldDefinitionInput = {
  config: FieldConfigInput;
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  helpText?: InputMaybe<Scalars['String']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isUnique?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type FieldFilterInput = {
  and?: InputMaybe<Array<FieldFilterInput>>;
  collection?: InputMaybe<CollectionFilterInput>;
  collectionId?: InputMaybe<UuidOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdBy?: InputMaybe<UuidOperationFilterInput>;
  createdByUser?: InputMaybe<UserFilterInput>;
  dataType?: InputMaybe<FieldDataTypeOperationFilterInput>;
  defaultValue?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  entryRelations?: InputMaybe<ListFilterInputTypeOfEntryRelationFilterInput>;
  helpText?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isRequired?: InputMaybe<BooleanOperationFilterInput>;
  isUnique?: InputMaybe<BooleanOperationFilterInput>;
  label?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<FieldFilterInput>>;
  relatedCollection?: InputMaybe<CollectionFilterInput>;
  relatedCollectionId?: InputMaybe<UuidOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type FieldUpdateDefinitionInput = {
  dataType?: InputMaybe<FieldDataType>;
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  helpText?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  isUnique?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  relatedCollectionId?: InputMaybe<Scalars['ID']['input']>;
};

export type FloatOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonDocumentFilterInput = {
  and?: InputMaybe<Array<JsonDocumentFilterInput>>;
  or?: InputMaybe<Array<JsonDocumentFilterInput>>;
  rootElement?: InputMaybe<JsonElementFilterInput>;
};

export type JsonElementFilterInput = {
  and?: InputMaybe<Array<JsonElementFilterInput>>;
  or?: InputMaybe<Array<JsonElementFilterInput>>;
  valueKind?: InputMaybe<JsonValueKindOperationFilterInput>;
};

export enum JsonValueKind {
  Array = 'ARRAY',
  False = 'FALSE',
  Null = 'NULL',
  Number = 'NUMBER',
  Object = 'OBJECT',
  String = 'STRING',
  True = 'TRUE',
  Undefined = 'UNDEFINED'
}

export type JsonValueKindOperationFilterInput = {
  eq?: InputMaybe<JsonValueKind>;
  in?: InputMaybe<Array<JsonValueKind>>;
  neq?: InputMaybe<JsonValueKind>;
  nin?: InputMaybe<Array<JsonValueKind>>;
};

export type ListFilterInputTypeOfAbacPolicyRuleFilterInput = {
  all?: InputMaybe<AbacPolicyRuleFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<AbacPolicyRuleFilterInput>;
  some?: InputMaybe<AbacPolicyRuleFilterInput>;
};

export type ListFilterInputTypeOfEntryFilterInput = {
  all?: InputMaybe<EntryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EntryFilterInput>;
  some?: InputMaybe<EntryFilterInput>;
};

export type ListFilterInputTypeOfEntryRelationFilterInput = {
  all?: InputMaybe<EntryRelationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EntryRelationFilterInput>;
  some?: InputMaybe<EntryRelationFilterInput>;
};

export type ListFilterInputTypeOfFieldFilterInput = {
  all?: InputMaybe<FieldFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FieldFilterInput>;
  some?: InputMaybe<FieldFilterInput>;
};

export type ListFilterInputTypeOfRolePolicyFilterInput = {
  all?: InputMaybe<RolePolicyFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RolePolicyFilterInput>;
  some?: InputMaybe<RolePolicyFilterInput>;
};

export type ListFilterInputTypeOfUserPolicyFilterInput = {
  all?: InputMaybe<UserPolicyFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UserPolicyFilterInput>;
  some?: InputMaybe<UserPolicyFilterInput>;
};

export type ListFilterInputTypeOfUserRoleFilterInput = {
  all?: InputMaybe<UserRoleFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UserRoleFilterInput>;
  some?: InputMaybe<UserRoleFilterInput>;
};

export type ListStringOperationFilterInput = {
  all?: InputMaybe<StringOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StringOperationFilterInput>;
  some?: InputMaybe<StringOperationFilterInput>;
};

export type ListUuidOperationFilterInput = {
  all?: InputMaybe<UuidOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UuidOperationFilterInput>;
  some?: InputMaybe<UuidOperationFilterInput>;
};

export enum Locale {
  Ar = 'AR',
  De = 'DE',
  En = 'EN',
  Es = 'ES',
  Fr = 'FR',
  It = 'IT',
  Ja = 'JA',
  Ko = 'KO',
  Pt = 'PT',
  Ru = 'RU',
  Zh = 'ZH'
}

export type LocaleOperationFilterInput = {
  eq?: InputMaybe<Locale>;
  in?: InputMaybe<Array<Locale>>;
  neq?: InputMaybe<Locale>;
  nin?: InputMaybe<Array<Locale>>;
};

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

export type LogicalOperatorOperationFilterInput = {
  eq?: InputMaybe<LogicalOperator>;
  in?: InputMaybe<Array<LogicalOperator>>;
  neq?: InputMaybe<LogicalOperator>;
  nin?: InputMaybe<Array<LogicalOperator>>;
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  accessToken: Token;
  refreshToken: Token;
  user?: Maybe<User>;
};

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _placeholder: Scalars['String']['output'];
  apiKeys: ApiKeyMutation;
  assets: AssetMutation;
  auth: AuthMutation;
  collections: CollectionMutation;
  policy: PolicyMutation;
  roles: RoleMutation;
  users: UserMutation;
};

/** A connection to a list of items. */
export type MyKeysConnection = {
  __typename?: 'MyKeysConnection';
  /** A list of edges. */
  edges?: Maybe<Array<MyKeysEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ApiKey>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MyKeysEdge = {
  __typename?: 'MyKeysEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ApiKey;
};

export type NullableOfAttributePathOperationFilterInput = {
  eq?: InputMaybe<AttributePath>;
  in?: InputMaybe<Array<InputMaybe<AttributePath>>>;
  neq?: InputMaybe<AttributePath>;
  nin?: InputMaybe<Array<InputMaybe<AttributePath>>>;
};

export enum OperatorType {
  Contains = 'CONTAINS',
  EndsWith = 'ENDS_WITH',
  Eq = 'EQ',
  EqContextRef = 'EQ_CONTEXT_REF',
  Gt = 'GT',
  Gte = 'GTE',
  In = 'IN',
  IsNotNull = 'IS_NOT_NULL',
  IsNull = 'IS_NULL',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE',
  NotIn = 'NOT_IN',
  Regex = 'REGEX',
  StartsWith = 'STARTS_WITH'
}

export type OperatorTypeOperationFilterInput = {
  eq?: InputMaybe<OperatorType>;
  in?: InputMaybe<Array<OperatorType>>;
  neq?: InputMaybe<OperatorType>;
  nin?: InputMaybe<Array<OperatorType>>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export enum PermissionAction {
  Activate = 'ACTIVATE',
  Archive = 'ARCHIVE',
  Create = 'CREATE',
  Deactivate = 'DEACTIVATE',
  Delete = 'DELETE',
  Download = 'DOWNLOAD',
  ManageSchema = 'MANAGE_SCHEMA',
  Publish = 'PUBLISH',
  Read = 'READ',
  Restore = 'RESTORE',
  Schedule = 'SCHEDULE',
  Unpublish = 'UNPUBLISH',
  Update = 'UPDATE',
  Upload = 'UPLOAD',
  Wildcard = 'WILDCARD'
}

export type PermissionActionOperationFilterInput = {
  eq?: InputMaybe<PermissionAction>;
  in?: InputMaybe<Array<PermissionAction>>;
  neq?: InputMaybe<PermissionAction>;
  nin?: InputMaybe<Array<PermissionAction>>;
};

export enum PermissionEffect {
  Allow = 'ALLOW',
  Deny = 'DENY'
}

export type PermissionEffectOperationFilterInput = {
  eq?: InputMaybe<PermissionEffect>;
  in?: InputMaybe<Array<PermissionEffect>>;
  neq?: InputMaybe<PermissionEffect>;
  nin?: InputMaybe<Array<PermissionEffect>>;
};

/** A connection to a list of items. */
export type PoliciesConnection = {
  __typename?: 'PoliciesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PoliciesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Policy>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PoliciesEdge = {
  __typename?: 'PoliciesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Policy;
};

export type Policy = {
  __typename?: 'Policy';
  actionType: PermissionAction;
  assignedToRoles: Array<RolePolicy>;
  assignedToUsers: Array<UserPolicy>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  effect: PermissionEffect;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastEvaluatedAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  priority: Scalars['Int']['output'];
  resourceType: BaseResource;
  ruleConnector: LogicalOperator;
  rules: Array<PolicyRule>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PolicyAssignmentChoiceInput = {
  assignments?: InputMaybe<Array<PolicyAssignmentInput>>;
  ids?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type PolicyAssignmentInRoleChoiceInput = {
  assignments?: InputMaybe<Array<PolicyAssignmentInRoleInput>>;
  ids?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type PolicyAssignmentInRoleInput = {
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  policyId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type PolicyAssignmentInput = {
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  policyId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type PolicyMutation = {
  __typename?: 'PolicyMutation';
  create: Policy;
  delete: Scalars['Boolean']['output'];
  update: Policy;
};


export type PolicyMutationCreateArgs = {
  input: CreatePolicyInput;
};


export type PolicyMutationDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type PolicyMutationUpdateArgs = {
  input: UpdatePolicyInput;
};

export type PolicyQuery = {
  __typename?: 'PolicyQuery';
  policies?: Maybe<PoliciesConnection>;
  policy?: Maybe<Policy>;
};


export type PolicyQueryPoliciesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<AbacPolicySortInput>>;
  where?: InputMaybe<AbacPolicyFilterInput>;
};


export type PolicyQueryPolicyArgs = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type PolicyRule = {
  __typename?: 'PolicyRule';
  attributePath: AttributePath;
  contextReferencePath?: Maybe<AttributePath>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expectedArrayValue?: Maybe<Array<Scalars['String']['output']>>;
  expectedBooleanValue?: Maybe<Scalars['Boolean']['output']>;
  expectedDateTimeValue?: Maybe<Scalars['DateTime']['output']>;
  expectedNumberValue?: Maybe<Scalars['Float']['output']>;
  expectedStringValue?: Maybe<Scalars['String']['output']>;
  expectedUuidValue?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  operator: OperatorType;
  order: Scalars['Int']['output'];
  policyId: Scalars['ID']['output'];
  valueType: ValueType;
};

export type PolicyRuleValueInput = {
  arrayValue?: InputMaybe<Array<Scalars['String']['input']>>;
  booleanValue?: InputMaybe<Scalars['Boolean']['input']>;
  contextReferencePath?: InputMaybe<AttributePath>;
  dateTimeValue?: InputMaybe<Scalars['DateTime']['input']>;
  numberValue?: InputMaybe<Scalars['Float']['input']>;
  stringValue?: InputMaybe<Scalars['String']['input']>;
  uuidValue?: InputMaybe<Scalars['UUID']['input']>;
};

export type Query = {
  __typename?: 'Query';
  apiKeys: ApiKeyQuery;
  assets: AssetQuery;
  audit: AuditQuery;
  auth: AuthQuery;
  collections: CollectionQuery;
  helloWorld: Scalars['String']['output'];
  policy: PolicyQuery;
  roles: RoleQuery;
  users: UserQuery;
};

export type RefreshPayload = {
  __typename?: 'RefreshPayload';
  accessToken: Token;
  refreshToken: Token;
};

export type RelationFieldConfigInput = {
  relatedCollectionId: Scalars['ID']['input'];
};

export type Role = {
  __typename?: 'Role';
  creationTime: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastEditTime: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  policies: Array<RolePolicy>;
  users: Array<UserRole>;
};

export type RoleAssignmentChoiceInput = {
  assignments?: InputMaybe<Array<RoleAssignmentInput>>;
  ids?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type RoleAssignmentInput = {
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  roleId: Scalars['ID']['input'];
};

export type RoleFilterInput = {
  and?: InputMaybe<Array<RoleFilterInput>>;
  creationTime?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  lastEditTime?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RoleFilterInput>>;
  rolePolicies?: InputMaybe<ListFilterInputTypeOfRolePolicyFilterInput>;
  userRoles?: InputMaybe<ListFilterInputTypeOfUserRoleFilterInput>;
};

export type RoleMutation = {
  __typename?: 'RoleMutation';
  assignPolicy: Scalars['Boolean']['output'];
  create: Role;
  delete: Scalars['Boolean']['output'];
  unassignPolicy: Scalars['Boolean']['output'];
  update: Role;
  updatePolicyExpiration: Scalars['Boolean']['output'];
};


export type RoleMutationAssignPolicyArgs = {
  input: AssignPolicyToRoleInput;
};


export type RoleMutationCreateArgs = {
  input: CreateRoleInput;
};


export type RoleMutationDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type RoleMutationUnassignPolicyArgs = {
  policyId: Scalars['UUID']['input'];
  roleId: Scalars['UUID']['input'];
};


export type RoleMutationUpdateArgs = {
  input: UpdateRoleInput;
};


export type RoleMutationUpdatePolicyExpirationArgs = {
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  policyId: Scalars['UUID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  roleId: Scalars['UUID']['input'];
};

export type RolePolicy = {
  __typename?: 'RolePolicy';
  assignedAt: Scalars['DateTime']['output'];
  assignedBy: Scalars['UUID']['output'];
  assignedByUser: User;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  policy: Policy;
  policyId: Scalars['UUID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  role: Role;
  roleId: Scalars['UUID']['output'];
};

export type RolePolicyFilterInput = {
  and?: InputMaybe<Array<RolePolicyFilterInput>>;
  assignedAt?: InputMaybe<DateTimeOperationFilterInput>;
  assignedBy?: InputMaybe<UuidOperationFilterInput>;
  assignedByUser?: InputMaybe<UserFilterInput>;
  expiresAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<RolePolicyFilterInput>>;
  policy?: InputMaybe<AbacPolicyFilterInput>;
  policyId?: InputMaybe<UuidOperationFilterInput>;
  reason?: InputMaybe<StringOperationFilterInput>;
  role?: InputMaybe<RoleFilterInput>;
  roleId?: InputMaybe<UuidOperationFilterInput>;
};

export type RoleQuery = {
  __typename?: 'RoleQuery';
  role?: Maybe<Role>;
  roles?: Maybe<RolesConnection>;
};


export type RoleQueryRoleArgs = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type RoleQueryRolesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RoleSortInput>>;
  where?: InputMaybe<RoleFilterInput>;
};

export type RoleSortInput = {
  creationTime?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  lastEditTime?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type RolesConnection = {
  __typename?: 'RolesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RolesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Role>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type RolesEdge = {
  __typename?: 'RolesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Role;
};

export enum ScheduledAction {
  Archive = 'ARCHIVE',
  Delete = 'DELETE',
  Publish = 'PUBLISH',
  Restore = 'RESTORE',
  Unpublish = 'UNPUBLISH'
}

export enum ScopeType {
  CollectionSpecific = 'COLLECTION_SPECIFIC',
  EntrySpecific = 'ENTRY_SPECIFIC',
  Global = 'GLOBAL'
}

export type SimpleFieldConfigInput = {
  dataType: SimpleFieldDataType;
};

export enum SimpleFieldDataType {
  Asset = 'ASSET',
  Boolean = 'BOOLEAN',
  DateTime = 'DATE_TIME',
  Number = 'NUMBER',
  Object = 'OBJECT',
  Text = 'TEXT'
}

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Token = {
  __typename?: 'Token';
  expiresAt: Scalars['DateTime']['output'];
  tokenValue: Scalars['String']['output'];
};

export type UpdateApiKeyInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAssetInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateCollectionInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  defaultLocale?: InputMaybe<Locale>;
  deleteFieldIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  fields?: InputMaybe<Array<FieldUpdateDefinitionInput>>;
  iconId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['ID']['input'];
  isLocalized?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  supportedLocales?: InputMaybe<Array<Locale>>;
};

export type UpdatePolicyInput = {
  deleteRuleIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  effect?: InputMaybe<PermissionEffect>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  ruleConnector?: InputMaybe<LogicalOperator>;
  rules?: InputMaybe<Array<UpdatePolicyRuleInput>>;
};

export type UpdatePolicyRuleInput = {
  attributePath: AttributePath;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  operator: OperatorType;
  order?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<PolicyRuleValueInput>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<UserStatus>;
};

export type User = {
  __typename?: 'User';
  apiKeys: Array<ApiKey>;
  creationTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastEditTime: Scalars['DateTime']['output'];
  lastLoginTime: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  policies: Array<UserPolicy>;
  roles: Array<UserRole>;
  status: UserStatus;
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  creationTime?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  lastEditTime?: InputMaybe<DateTimeOperationFilterInput>;
  lastLoginTime?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  status?: InputMaybe<UserStatusOperationFilterInput>;
};

export type UserMutation = {
  __typename?: 'UserMutation';
  activate: User;
  assignPolicy: Scalars['Boolean']['output'];
  assignRole: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  create: User;
  deactivate: User;
  delete: Scalars['Boolean']['output'];
  unassignPolicy: Scalars['Boolean']['output'];
  unassignRole: Scalars['Boolean']['output'];
  update: User;
  updatePolicyExpiration: Scalars['Boolean']['output'];
  updateRoleExpiration: Scalars['Boolean']['output'];
};


export type UserMutationActivateArgs = {
  id: Scalars['UUID']['input'];
};


export type UserMutationAssignPolicyArgs = {
  input: AssignPolicyToUserInput;
};


export type UserMutationAssignRoleArgs = {
  input: AssignRoleInput;
};


export type UserMutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type UserMutationCreateArgs = {
  input: CreateUserInput;
};


export type UserMutationDeactivateArgs = {
  id: Scalars['UUID']['input'];
};


export type UserMutationDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type UserMutationUnassignPolicyArgs = {
  policyId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type UserMutationUnassignRoleArgs = {
  roleId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type UserMutationUpdateArgs = {
  input: UpdateUserInput;
};


export type UserMutationUpdatePolicyExpirationArgs = {
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  policyId: Scalars['UUID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['UUID']['input'];
};


export type UserMutationUpdateRoleExpirationArgs = {
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  roleId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export type UserPolicy = {
  __typename?: 'UserPolicy';
  assignedAt: Scalars['DateTime']['output'];
  assignedBy: Scalars['UUID']['output'];
  assignedByUser: User;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  policy: Policy;
  policyId: Scalars['UUID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  user: User;
  userId: Scalars['UUID']['output'];
};

export type UserPolicyFilterInput = {
  and?: InputMaybe<Array<UserPolicyFilterInput>>;
  assignedAt?: InputMaybe<DateTimeOperationFilterInput>;
  assignedBy?: InputMaybe<UuidOperationFilterInput>;
  assignedByUser?: InputMaybe<UserFilterInput>;
  expiresAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<UserPolicyFilterInput>>;
  policy?: InputMaybe<AbacPolicyFilterInput>;
  policyId?: InputMaybe<UuidOperationFilterInput>;
  reason?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type UserQuery = {
  __typename?: 'UserQuery';
  user?: Maybe<User>;
  users?: Maybe<UsersConnection>;
};


export type UserQueryUserArgs = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type UserQueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};

export type UserRole = {
  __typename?: 'UserRole';
  assignedAt: Scalars['DateTime']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  role: Role;
};

export type UserRoleFilterInput = {
  and?: InputMaybe<Array<UserRoleFilterInput>>;
  assignedAt?: InputMaybe<DateTimeOperationFilterInput>;
  expiresAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<UserRoleFilterInput>>;
  role?: InputMaybe<RoleFilterInput>;
  roleId?: InputMaybe<UuidOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type UserSortInput = {
  creationTime?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  lastEditTime?: InputMaybe<SortEnumType>;
  lastLoginTime?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Banned = 'BANNED',
  Inactive = 'INACTIVE'
}

export type UserStatusOperationFilterInput = {
  eq?: InputMaybe<UserStatus>;
  in?: InputMaybe<Array<UserStatus>>;
  neq?: InputMaybe<UserStatus>;
  nin?: InputMaybe<Array<UserStatus>>;
};

/** A connection to a list of items. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: User;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export enum ValueType {
  Array = 'ARRAY',
  Boolean = 'BOOLEAN',
  Datetime = 'DATETIME',
  Number = 'NUMBER',
  String = 'STRING',
  Uuid = 'UUID'
}

export type ValueTypeOperationFilterInput = {
  eq?: InputMaybe<ValueType>;
  in?: InputMaybe<Array<ValueType>>;
  neq?: InputMaybe<ValueType>;
  nin?: InputMaybe<Array<ValueType>>;
};

export type GetApiKeysQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetApiKeysQuery = { __typename?: 'Query', apiKeys: { __typename?: 'ApiKeyQuery', apiKeys?: { __typename?: 'ApiKeysConnection', nodes?: Array<{ __typename?: 'ApiKey', id: string, name: string, keyPrefix: string, isActive: boolean, createdAt: any, updatedAt: any, expiresAt?: any | null, lastUsedAt?: any | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } };

export type GetApiKeyQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetApiKeyQuery = { __typename?: 'Query', apiKeys: { __typename?: 'ApiKeyQuery', apiKey?: { __typename?: 'ApiKey', id: string, name: string, keyPrefix: string, isActive: boolean, createdAt: any, updatedAt: any, expiresAt?: any | null, lastUsedAt?: any | null } | null } };

export type CreateApiKeyMutationVariables = Exact<{
  input: CreateApiKeyInput;
}>;


export type CreateApiKeyMutation = { __typename?: 'Mutation', apiKeys: { __typename?: 'ApiKeyMutation', createApiKey: { __typename?: 'CreateApiKeyPayload', key: string, apiKey?: { __typename?: 'ApiKey', id: string } | null } } };

export type UpdateApiKeyMutationVariables = Exact<{
  input: UpdateApiKeyInput;
}>;


export type UpdateApiKeyMutation = { __typename?: 'Mutation', apiKeys: { __typename?: 'ApiKeyMutation', updateApiKey: { __typename?: 'ApiKey', id: string, name: string, isActive: boolean } } };

export type RevokeApiKeyMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RevokeApiKeyMutation = { __typename?: 'Mutation', apiKeys: { __typename?: 'ApiKeyMutation', revokeApiKey: { __typename?: 'ApiKey', id: string, isActive: boolean } } };

export type DeleteApiKeyMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteApiKeyMutation = { __typename?: 'Mutation', apiKeys: { __typename?: 'ApiKeyMutation', deleteApiKey: boolean } };

export type GetAssetsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAssetsQuery = { __typename?: 'Query', assets: { __typename?: 'AssetQuery', assets?: { __typename?: 'AssetsConnection', nodes?: Array<{ __typename?: 'Asset', id: string, filename: string, mimeType: string, fileSize: number, url: string, alt?: string | null, caption?: string | null, isPublic: boolean, uploadedAt: any, uploadedByUser?: { __typename?: 'User', id: string, name: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } };

export type AssetsComboboxQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AssetsComboboxQuery = { __typename?: 'Query', assets: { __typename?: 'AssetQuery', assets?: { __typename?: 'AssetsConnection', nodes?: Array<{ __typename?: 'Asset', id: string, filename: string, caption?: string | null }> | null } | null } };

export type UpdateAssetMutationVariables = Exact<{
  input: UpdateAssetInput;
}>;


export type UpdateAssetMutation = { __typename?: 'Mutation', assets: { __typename?: 'AssetMutation', update: { __typename?: 'Asset', id: string, filename: string, alt?: string | null, caption?: string | null, isPublic: boolean } } };

export type DeleteAssetMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteAssetMutation = { __typename?: 'Mutation', assets: { __typename?: 'AssetMutation', delete: boolean } };

export type GetAuditsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<AbacAuditFilterInput>;
  order?: InputMaybe<Array<AbacAuditSortInput> | AbacAuditSortInput>;
}>;


export type GetAuditsQuery = { __typename?: 'Query', audit: { __typename?: 'AuditQuery', audits?: { __typename?: 'AuditsConnection', nodes?: Array<{ __typename?: 'Audit', id: string, requestedAction: PermissionAction, resourceType: BaseResource, decision: PermissionEffect, decisionReason: string, evaluationTimeMs: number, timestamp: any, ipAddress?: string | null, userAgent?: string | null, sessionId?: string | null, evaluatedPolicyIds?: Array<any> | null, matchingPolicyIds?: Array<any> | null, user?: { __typename?: 'User', id: string, name: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } };

export type GetAuditQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetAuditQuery = { __typename?: 'Query', audit: { __typename?: 'AuditQuery', audit?: { __typename?: 'Audit', id: string, requestedAction: PermissionAction, resourceType: BaseResource, decision: PermissionEffect, decisionReason: string, evaluationTimeMs: number, timestamp: any, ipAddress?: string | null, userAgent?: string | null, sessionId?: string | null, evaluatedPolicyIds?: Array<any> | null, matchingPolicyIds?: Array<any> | null, user?: { __typename?: 'User', id: string, name: string } | null } | null } };

export type GetCollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCollectionsQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionQuery', collectionsData?: { __typename?: 'CollectionsDataConnection', nodes?: Array<{ __typename?: 'Collection', id: string, name: string, slug: string, color?: string | null, description?: string | null, entryCount: number, isLocalized: boolean, defaultLocale: Locale, createdAt: any, icon?: { __typename?: 'Asset', id: string, url: string, filename: string } | null, fields: Array<{ __typename?: 'Field', id: string }> }> | null } | null } };

export type CollectionsComboboxQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type CollectionsComboboxQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionQuery', collectionsData?: { __typename?: 'CollectionsDataConnection', nodes?: Array<{ __typename?: 'Collection', id: string, name: string, slug: string }> | null } | null } };

export type GetCollectionQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCollectionQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionQuery', collectionData?: { __typename?: 'Collection', id: string, name: string, slug: string, color?: string | null, description?: string | null, entryCount: number, isLocalized: boolean, defaultLocale: Locale, supportedLocales: Array<Locale>, createdAt: any, updatedAt: any, icon?: { __typename?: 'Asset', id: string, url: string, filename: string } | null, fields: Array<{ __typename?: 'Field', id: string, name: string, label?: string | null, dataType: FieldDataType, isRequired: boolean, isUnique: boolean, defaultValue?: string | null, description?: string | null, helpText?: string | null, relatedCollectionId?: any | null, relatedCollection?: { __typename?: 'Collection', color?: string | null, createdAt: any, defaultLocale: Locale, description?: string | null, entryCount: number, id: string, isLocalized: boolean, name: string, slug: string, supportedLocales: Array<Locale>, updatedAt: any } | null }> } | null } };

export type CreateCollectionMutationVariables = Exact<{
  input: CreateCollectionInput;
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', collections: { __typename?: 'CollectionMutation', create: { __typename?: 'Collection', id: string, slug: string } } };

export type DeleteCollectionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteCollectionMutation = { __typename?: 'Mutation', collections: { __typename?: 'CollectionMutation', delete: boolean } };

export type UpdateCollectionMutationVariables = Exact<{
  input: UpdateCollectionInput;
}>;


export type UpdateCollectionMutation = { __typename?: 'Mutation', collections: { __typename?: 'CollectionMutation', update: { __typename?: 'Collection', id: string, slug: string } } };

export type GetPoliciesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<AbacPolicyFilterInput>;
}>;


export type GetPoliciesQuery = { __typename?: 'Query', policy: { __typename?: 'PolicyQuery', policies?: { __typename?: 'PoliciesConnection', nodes?: Array<{ __typename?: 'Policy', id: string, name: string, description?: string | null, actionType: PermissionAction, effect: PermissionEffect, resourceType: BaseResource, isActive: boolean, priority: number, ruleConnector: LogicalOperator, createdAt: any, rules: Array<{ __typename?: 'PolicyRule', id: string, attributePath: AttributePath, operator: OperatorType, expectedStringValue?: string | null, expectedNumberValue?: number | null, expectedBooleanValue?: boolean | null, expectedDateTimeValue?: any | null, expectedUuidValue?: any | null, expectedArrayValue?: Array<string> | null, contextReferencePath?: AttributePath | null, isActive: boolean, order: number, description?: string | null }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } };

export type GetPolicyQueryVariables = Exact<{
  id?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type GetPolicyQuery = { __typename?: 'Query', policy: { __typename?: 'PolicyQuery', policy?: { __typename?: 'Policy', id: string, name: string, description?: string | null, actionType: PermissionAction, effect: PermissionEffect, resourceType: BaseResource, isActive: boolean, priority: number, ruleConnector: LogicalOperator, createdAt: any, updatedAt: any, rules: Array<{ __typename?: 'PolicyRule', id: string, attributePath: AttributePath, operator: OperatorType, expectedStringValue?: string | null, expectedNumberValue?: number | null, expectedBooleanValue?: boolean | null, expectedDateTimeValue?: any | null, expectedUuidValue?: any | null, expectedArrayValue?: Array<string> | null, contextReferencePath?: AttributePath | null, isActive: boolean, order: number, description?: string | null }> } | null } };

export type CreatePolicyMutationVariables = Exact<{
  input: CreatePolicyInput;
}>;


export type CreatePolicyMutation = { __typename?: 'Mutation', policy: { __typename?: 'PolicyMutation', create: { __typename?: 'Policy', id: string, name: string } } };

export type UpdatePolicyMutationVariables = Exact<{
  input: UpdatePolicyInput;
}>;


export type UpdatePolicyMutation = { __typename?: 'Mutation', policy: { __typename?: 'PolicyMutation', update: { __typename?: 'Policy', id: string, name: string } } };

export type DeletePolicyMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeletePolicyMutation = { __typename?: 'Mutation', policy: { __typename?: 'PolicyMutation', delete: boolean } };

export type PoliciesForComboboxQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AbacPolicyFilterInput>;
}>;


export type PoliciesForComboboxQuery = { __typename?: 'Query', policy: { __typename?: 'PolicyQuery', policies?: { __typename?: 'PoliciesConnection', nodes?: Array<{ __typename?: 'Policy', id: string, name: string, effect: PermissionEffect, resourceType: BaseResource, actionType: PermissionAction }> | null } | null } };

export type GetRolesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<RoleFilterInput>;
}>;


export type GetRolesQuery = { __typename?: 'Query', roles: { __typename?: 'RoleQuery', roles?: { __typename?: 'RolesConnection', nodes?: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null, creationTime: any, lastEditTime: any, policies: Array<{ __typename?: 'RolePolicy', id: any, assignedAt: any, expiresAt?: any | null, reason?: string | null, policy: { __typename?: 'Policy', id: string, name: string, actionType: PermissionAction, effect: PermissionEffect, resourceType: BaseResource, description?: string | null } }>, users: Array<{ __typename?: 'UserRole', id: string, assignedAt: any, expiresAt?: any | null, role: { __typename?: 'Role', id: string, name: string } }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } };

export type GetRoleQueryVariables = Exact<{
  id?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type GetRoleQuery = { __typename?: 'Query', roles: { __typename?: 'RoleQuery', role?: { __typename?: 'Role', id: string, name: string, description?: string | null, creationTime: any, lastEditTime: any, policies: Array<{ __typename?: 'RolePolicy', id: any, assignedAt: any, expiresAt?: any | null, reason?: string | null, policy: { __typename?: 'Policy', id: string, name: string, actionType: PermissionAction, effect: PermissionEffect, resourceType: BaseResource, description?: string | null } }>, users: Array<{ __typename?: 'UserRole', id: string, assignedAt: any, expiresAt?: any | null, role: { __typename?: 'Role', id: string, name: string } }> } | null } };

export type CreateRoleMutationVariables = Exact<{
  input: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', roles: { __typename?: 'RoleMutation', create: { __typename?: 'Role', id: string, name: string } } };

export type UpdateRoleMutationVariables = Exact<{
  input: UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', roles: { __typename?: 'RoleMutation', update: { __typename?: 'Role', id: string, name: string } } };

export type DeleteRoleMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteRoleMutation = { __typename?: 'Mutation', roles: { __typename?: 'RoleMutation', delete: boolean } };

export type AssignPolicyToRoleMutationVariables = Exact<{
  input: AssignPolicyToRoleInput;
}>;


export type AssignPolicyToRoleMutation = { __typename?: 'Mutation', roles: { __typename?: 'RoleMutation', assignPolicy: boolean } };

export type UnassignPolicyFromRoleMutationVariables = Exact<{
  policyId: Scalars['UUID']['input'];
  roleId: Scalars['UUID']['input'];
}>;


export type UnassignPolicyFromRoleMutation = { __typename?: 'Mutation', roles: { __typename?: 'RoleMutation', unassignPolicy: boolean } };

export type RolesForComboboxQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RoleFilterInput>;
}>;


export type RolesForComboboxQuery = { __typename?: 'Query', roles: { __typename?: 'RoleQuery', roles?: { __typename?: 'RolesConnection', nodes?: Array<{ __typename?: 'Role', id: string, name: string, description?: string | null }> | null } | null } };

export type GetUsersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserFilterInput>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'UserQuery', users?: { __typename?: 'UsersConnection', nodes?: Array<{ __typename?: 'User', id: string, name: string, status: UserStatus, creationTime: any, lastLoginTime: any, lastEditTime: any, roles: Array<{ __typename?: 'UserRole', id: string, role: { __typename?: 'Role', id: string, name: string } }>, policies: Array<{ __typename?: 'UserPolicy', id: any, assignedAt: any, expiresAt?: any | null, reason?: string | null, policy: { __typename?: 'Policy', id: string, name: string, effect: PermissionEffect, resourceType: BaseResource, actionType: PermissionAction } }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } };

export type GetUserQueryVariables = Exact<{
  id?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type GetUserQuery = { __typename?: 'Query', users: { __typename?: 'UserQuery', user?: { __typename?: 'User', id: string, name: string, status: UserStatus, creationTime: any, lastLoginTime: any, lastEditTime: any, roles: Array<{ __typename?: 'UserRole', id: string, assignedAt: any, expiresAt?: any | null, role: { __typename?: 'Role', id: string, name: string } }>, policies: Array<{ __typename?: 'UserPolicy', id: any, assignedAt: any, expiresAt?: any | null, reason?: string | null, policy: { __typename?: 'Policy', id: string, name: string, effect: PermissionEffect, resourceType: BaseResource, actionType: PermissionAction } }> } | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', users: { __typename?: 'UserMutation', create: { __typename?: 'User', id: string, name: string } } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', users: { __typename?: 'UserMutation', update: { __typename?: 'User', id: string, name: string } } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', users: { __typename?: 'UserMutation', delete: boolean } };

export type AssignRoleMutationVariables = Exact<{
  input: AssignRoleInput;
}>;


export type AssignRoleMutation = { __typename?: 'Mutation', users: { __typename?: 'UserMutation', assignRole: boolean } };

export type UnassignRoleMutationVariables = Exact<{
  userId: Scalars['UUID']['input'];
  roleId: Scalars['UUID']['input'];
}>;


export type UnassignRoleMutation = { __typename?: 'Mutation', users: { __typename?: 'UserMutation', unassignRole: boolean } };

export type ActivateUserMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type ActivateUserMutation = { __typename?: 'Mutation', users: { __typename?: 'UserMutation', activate: { __typename?: 'User', id: string, status: UserStatus } } };

export type DeactivateUserMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeactivateUserMutation = { __typename?: 'Mutation', users: { __typename?: 'UserMutation', deactivate: { __typename?: 'User', id: string, status: UserStatus } } };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', users: { __typename?: 'UserMutation', changePassword: boolean } };

export type AssignPolicyToUserMutationVariables = Exact<{
  input: AssignPolicyToUserInput;
}>;


export type AssignPolicyToUserMutation = { __typename?: 'Mutation', users: { __typename?: 'UserMutation', assignPolicy: boolean } };

export type UnassignPolicyFromUserMutationVariables = Exact<{
  policyId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type UnassignPolicyFromUserMutation = { __typename?: 'Mutation', users: { __typename?: 'UserMutation', unassignPolicy: boolean } };

export type LoginMutationVariables = Exact<{
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutation', login: { __typename?: 'LoginPayload', accessToken: { __typename?: 'Token', tokenValue: string, expiresAt: any }, refreshToken: { __typename?: 'Token', tokenValue: string, expiresAt: any }, user?: { __typename?: 'User', id: string, name: string, status: UserStatus, roles: Array<{ __typename?: 'UserRole', id: string, assignedAt: any, expiresAt?: any | null, role: { __typename?: 'Role', id: string, name: string, policies: Array<{ __typename?: 'RolePolicy', id: any, assignedAt: any, expiresAt?: any | null, policy: { __typename?: 'Policy', resourceType: BaseResource, actionType: PermissionAction, effect: PermissionEffect } }> } }>, policies: Array<{ __typename?: 'UserPolicy', id: any, expiresAt?: any | null, policy: { __typename?: 'Policy', resourceType: BaseResource, actionType: PermissionAction, effect: PermissionEffect } }> } | null } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', auth: { __typename?: 'AuthQuery', me?: { __typename?: 'User', id: string, name: string, status: UserStatus, creationTime: any, lastLoginTime: any, roles: Array<{ __typename?: 'UserRole', id: string, assignedAt: any, expiresAt?: any | null, role: { __typename?: 'Role', id: string, name: string, policies: Array<{ __typename?: 'RolePolicy', id: any, assignedAt: any, expiresAt?: any | null, policy: { __typename?: 'Policy', resourceType: BaseResource, actionType: PermissionAction, effect: PermissionEffect } }> } }>, policies: Array<{ __typename?: 'UserPolicy', id: any, expiresAt?: any | null, policy: { __typename?: 'Policy', resourceType: BaseResource, actionType: PermissionAction, effect: PermissionEffect } }> } | null } };

export type RefreshMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutation', refresh: { __typename?: 'RefreshPayload', accessToken: { __typename?: 'Token', tokenValue: string, expiresAt: any }, refreshToken: { __typename?: 'Token', tokenValue: string, expiresAt: any } } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutation', logout: { __typename?: 'LogoutPayload', message: string } } };


export const GetApiKeysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetApiKeys"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiKeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiKeys"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"keyPrefix"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUsedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetApiKeysQuery, GetApiKeysQueryVariables>;
export const GetApiKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetApiKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiKeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"keyPrefix"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUsedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetApiKeyQuery, GetApiKeyQueryVariables>;
export const CreateApiKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateApiKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateApiKeyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiKeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createApiKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiKey"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]}}]} as unknown as DocumentNode<CreateApiKeyMutation, CreateApiKeyMutationVariables>;
export const UpdateApiKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateApiKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateApiKeyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiKeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateApiKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateApiKeyMutation, UpdateApiKeyMutationVariables>;
export const RevokeApiKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeApiKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiKeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeApiKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<RevokeApiKeyMutation, RevokeApiKeyMutationVariables>;
export const DeleteApiKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteApiKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiKeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteApiKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<DeleteApiKeyMutation, DeleteApiKeyMutationVariables>;
export const GetAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"uploadedAt"}},{"kind":"Field","name":{"kind":"Name","value":"uploadedByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAssetsQuery, GetAssetsQueryVariables>;
export const AssetsComboboxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssetsCombobox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"filename"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"caption"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AssetsComboboxQuery, AssetsComboboxQueryVariables>;
export const UpdateAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAssetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAssetMutation, UpdateAssetMutationVariables>;
export const DeleteAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<DeleteAssetMutation, DeleteAssetMutationVariables>;
export const GetAuditsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAudits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AbacAuditFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AbacAuditSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"audit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"audits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAction"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"decision"}},{"kind":"Field","name":{"kind":"Name","value":"decisionReason"}},{"kind":"Field","name":{"kind":"Name","value":"evaluationTimeMs"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"ipAddress"}},{"kind":"Field","name":{"kind":"Name","value":"userAgent"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluatedPolicyIds"}},{"kind":"Field","name":{"kind":"Name","value":"matchingPolicyIds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAuditsQuery, GetAuditsQueryVariables>;
export const GetAuditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAudit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"audit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"audit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requestedAction"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"decision"}},{"kind":"Field","name":{"kind":"Name","value":"decisionReason"}},{"kind":"Field","name":{"kind":"Name","value":"evaluationTimeMs"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"ipAddress"}},{"kind":"Field","name":{"kind":"Name","value":"userAgent"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluatedPolicyIds"}},{"kind":"Field","name":{"kind":"Name","value":"matchingPolicyIds"}}]}}]}}]}}]} as unknown as DocumentNode<GetAuditQuery, GetAuditQueryVariables>;
export const GetCollectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionsData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"entryCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"defaultLocale"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const CollectionsComboboxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CollectionsCombobox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionsData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CollectionsComboboxQuery, CollectionsComboboxQueryVariables>;
export const GetCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"entryCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"defaultLocale"}},{"kind":"Field","name":{"kind":"Name","value":"supportedLocales"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"dataType"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"isUnique"}},{"kind":"Field","name":{"kind":"Name","value":"defaultValue"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"helpText"}},{"kind":"Field","name":{"kind":"Name","value":"relatedCollectionId"}},{"kind":"Field","name":{"kind":"Name","value":"relatedCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"defaultLocale"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"entryCount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"supportedLocales"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectionQuery, GetCollectionQueryVariables>;
export const CreateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCollectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCollectionMutation, CreateCollectionMutationVariables>;
export const DeleteCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<DeleteCollectionMutation, DeleteCollectionMutationVariables>;
export const UpdateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCollectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCollectionMutation, UpdateCollectionMutationVariables>;
export const GetPoliciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPolicies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AbacPolicyFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"ruleConnector"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"rules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributePath"}},{"kind":"Field","name":{"kind":"Name","value":"operator"}},{"kind":"Field","name":{"kind":"Name","value":"expectedStringValue"}},{"kind":"Field","name":{"kind":"Name","value":"expectedNumberValue"}},{"kind":"Field","name":{"kind":"Name","value":"expectedBooleanValue"}},{"kind":"Field","name":{"kind":"Name","value":"expectedDateTimeValue"}},{"kind":"Field","name":{"kind":"Name","value":"expectedUuidValue"}},{"kind":"Field","name":{"kind":"Name","value":"expectedArrayValue"}},{"kind":"Field","name":{"kind":"Name","value":"contextReferencePath"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPoliciesQuery, GetPoliciesQueryVariables>;
export const GetPolicyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPolicy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"ruleConnector"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributePath"}},{"kind":"Field","name":{"kind":"Name","value":"operator"}},{"kind":"Field","name":{"kind":"Name","value":"expectedStringValue"}},{"kind":"Field","name":{"kind":"Name","value":"expectedNumberValue"}},{"kind":"Field","name":{"kind":"Name","value":"expectedBooleanValue"}},{"kind":"Field","name":{"kind":"Name","value":"expectedDateTimeValue"}},{"kind":"Field","name":{"kind":"Name","value":"expectedUuidValue"}},{"kind":"Field","name":{"kind":"Name","value":"expectedArrayValue"}},{"kind":"Field","name":{"kind":"Name","value":"contextReferencePath"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPolicyQuery, GetPolicyQueryVariables>;
export const CreatePolicyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePolicy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePolicyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePolicyMutation, CreatePolicyMutationVariables>;
export const UpdatePolicyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePolicy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePolicyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePolicyMutation, UpdatePolicyMutationVariables>;
export const DeletePolicyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePolicy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<DeletePolicyMutation, DeletePolicyMutationVariables>;
export const PoliciesForComboboxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PoliciesForCombobox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AbacPolicyFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"policies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PoliciesForComboboxQuery, PoliciesForComboboxQueryVariables>;
export const GetRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"creationTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastEditTime"}},{"kind":"Field","name":{"kind":"Name","value":"policies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRolesQuery, GetRolesQueryVariables>;
export const GetRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"creationTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastEditTime"}},{"kind":"Field","name":{"kind":"Name","value":"policies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRoleQuery, GetRoleQueryVariables>;
export const CreateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
export const UpdateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const DeleteRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const AssignPolicyToRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignPolicyToRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignPolicyToRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignPolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]}}]} as unknown as DocumentNode<AssignPolicyToRoleMutation, AssignPolicyToRoleMutationVariables>;
export const UnassignPolicyFromRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnassignPolicyFromRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"policyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unassignPolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"policyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"policyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}}}]}]}}]}}]} as unknown as DocumentNode<UnassignPolicyFromRoleMutation, UnassignPolicyFromRoleMutationVariables>;
export const RolesForComboboxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RolesForCombobox"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RolesForComboboxQuery, RolesForComboboxQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"creationTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastEditTime"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"policies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"creationTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastEditTime"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"policies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const AssignRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]}}]} as unknown as DocumentNode<AssignRoleMutation, AssignRoleMutationVariables>;
export const UnassignRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnassignRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unassignRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"roleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}}}]}]}}]}}]} as unknown as DocumentNode<UnassignRoleMutation, UnassignRoleMutationVariables>;
export const ActivateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<ActivateUserMutation, ActivateUserMutationVariables>;
export const DeactivateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeactivateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deactivate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<DeactivateUserMutation, DeactivateUserMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const AssignPolicyToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignPolicyToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignPolicyToUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignPolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]}}]} as unknown as DocumentNode<AssignPolicyToUserMutation, AssignPolicyToUserMutationVariables>;
export const UnassignPolicyFromUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnassignPolicyFromUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"policyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unassignPolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"policyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"policyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]}}]} as unknown as DocumentNode<UnassignPolicyFromUserMutation, UnassignPolicyFromUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenValue"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenValue"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"policies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"policies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"creationTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginTime"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"policies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"policies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"policy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"effect"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const RefreshDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Refresh"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenValue"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenValue"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RefreshMutation, RefreshMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;