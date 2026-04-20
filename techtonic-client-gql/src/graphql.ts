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
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  expectedValue?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  operator?: InputMaybe<OperatorTypeOperationFilterInput>;
  or?: InputMaybe<Array<AbacPolicyRuleFilterInput>>;
  order?: InputMaybe<IntOperationFilterInput>;
  policy?: InputMaybe<AbacPolicyFilterInput>;
  policyId?: InputMaybe<UuidOperationFilterInput>;
  valueType?: InputMaybe<ValueTypeOperationFilterInput>;
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
  assets: Array<Asset>;
};


export type AssetQueryAssetArgs = {
  id: Scalars['UUID']['input'];
};


export type AssetQueryAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  ResourceAssetFileSize = 'RESOURCE_ASSET_FILE_SIZE',
  ResourceAssetId = 'RESOURCE_ASSET_ID',
  ResourceAssetMimeType = 'RESOURCE_ASSET_MIME_TYPE',
  ResourceAssetUploadedBy = 'RESOURCE_ASSET_UPLOADED_BY',
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
};

export enum BaseResource {
  Assets = 'ASSETS',
  Collections = 'COLLECTIONS',
  Entries = 'ENTRIES',
  Users = 'USERS'
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CollectionSortInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
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

export type CreateCollectionInput = {
  color?: InputMaybe<Scalars['String']['input']>;
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
  expectedValue: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  operator: OperatorType;
  order?: InputMaybe<Scalars['Int']['input']>;
  valueType: ValueType;
};

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  policyIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type CreateUserInput = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  policyIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  roleIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
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
  assets: AssetMutation;
  auth: AuthMutation;
  collections: CollectionMutation;
  policy: PolicyMutation;
  roles: RoleMutation;
  users: UserMutation;
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
  Ban = 'BAN',
  Create = 'CREATE',
  Deactivate = 'DEACTIVATE',
  Delete = 'DELETE',
  Download = 'DOWNLOAD',
  ManageSchema = 'MANAGE_SCHEMA',
  Publish = 'PUBLISH',
  Read = 'READ',
  Restore = 'RESTORE',
  Schedule = 'SCHEDULE',
  Unban = 'UNBAN',
  Unpublish = 'UNPUBLISH',
  Update = 'UPDATE',
  Upload = 'UPLOAD'
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

export type Policy = {
  __typename?: 'Policy';
  actionType: PermissionAction;
  assignedToRoles: Array<RoleAssignment>;
  assignedToUsers: Array<UserAssignment>;
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
  policies: Array<Policy>;
  policy?: Maybe<Policy>;
};


export type PolicyQueryPoliciesArgs = {
  actionType?: InputMaybe<PermissionAction>;
  effect?: InputMaybe<PermissionEffect>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  resourceType?: InputMaybe<BaseResource>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type PolicyQueryPolicyArgs = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type PolicyRefInRole = {
  __typename?: 'PolicyRefInRole';
  actionType: PermissionAction;
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  effect: PermissionEffect;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  resourceType: BaseResource;
};

export type PolicyRule = {
  __typename?: 'PolicyRule';
  attributePath: AttributePath;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expectedValue: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  operator: OperatorType;
  order: Scalars['Int']['output'];
  policyId: Scalars['ID']['output'];
  valueType: ValueType;
};

export type Query = {
  __typename?: 'Query';
  assets: AssetQuery;
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
  policies: Array<PolicyRefInRole>;
  users: Array<UserRefInRole>;
};

export type RoleAssignment = {
  __typename?: 'RoleAssignment';
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RoleSortInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<RoleFilterInput>;
};

export type RoleRef = {
  __typename?: 'RoleRef';
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
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
  expectedValue: Scalars['String']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  operator: OperatorType;
  order?: InputMaybe<Scalars['Int']['input']>;
  valueType: ValueType;
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
  creationTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastEditTime: Scalars['DateTime']['output'];
  lastLoginTime: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  roles: Array<RoleRef>;
  status: UserStatus;
};

export type UserAssignment = {
  __typename?: 'UserAssignment';
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
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
  ban: User;
  changePassword: Scalars['Boolean']['output'];
  create: User;
  deactivate: User;
  delete: Scalars['Boolean']['output'];
  unassignPolicy: Scalars['Boolean']['output'];
  unassignRole: Scalars['Boolean']['output'];
  unban: User;
  update: User;
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


export type UserMutationBanArgs = {
  id: Scalars['UUID']['input'];
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


export type UserMutationUnbanArgs = {
  id: Scalars['UUID']['input'];
};


export type UserMutationUpdateArgs = {
  input: UpdateUserInput;
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UserSortInput>>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<UserStatus>;
  where?: InputMaybe<UserFilterInput>;
};

export type UserRefInRole = {
  __typename?: 'UserRefInRole';
  assignedAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: UserStatus;
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

export type LoginMutationVariables = Exact<{
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutation', login: { __typename?: 'LoginPayload', accessToken: { __typename?: 'Token', tokenValue: string, expiresAt: any }, refreshToken: { __typename?: 'Token', tokenValue: string, expiresAt: any }, user?: { __typename?: 'User', id: string, name: string, status: UserStatus, roles: Array<{ __typename?: 'RoleRef', id: string, name: string }> } | null } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', auth: { __typename?: 'AuthQuery', me?: { __typename?: 'User', id: string, name: string, status: UserStatus, creationTime: any, lastLoginTime: any, roles: Array<{ __typename?: 'RoleRef', id: string, name: string }> } | null } };

export type RefreshMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutation', refresh: { __typename?: 'RefreshPayload', accessToken: { __typename?: 'Token', tokenValue: string, expiresAt: any }, refreshToken: { __typename?: 'Token', tokenValue: string, expiresAt: any } } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutation', logout: { __typename?: 'LogoutPayload', message: string } } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenValue"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenValue"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"creationTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginTime"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const RefreshDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Refresh"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenValue"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenValue"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RefreshMutation, RefreshMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;