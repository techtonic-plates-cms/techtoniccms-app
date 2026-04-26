/**
 * Policy rule builder utilities — plain-language mapping for ABAC rules.
 * Designed for beginners who don't know what "ABAC" means.
 */

export const ATTRIBUTE_PATHS = [
	{ value: 'SUBJECT_ID', label: "User's ID", naturalType: 'uuid' as const },
	{ value: 'SUBJECT_ROLE', label: "User's role", naturalType: 'string' as const },
	{ value: 'SUBJECT_STATUS', label: "User's status", naturalType: 'string' as const },
	{
		value: 'SUBJECT_CREATED_AT',
		label: 'When the user was created',
		naturalType: 'datetime' as const
	},
	{ value: 'RESOURCE_ENTRY_ID', label: 'Entry ID', naturalType: 'uuid' as const },
	{ value: 'RESOURCE_ENTRY_STATUS', label: 'Entry status', naturalType: 'string' as const },
	{
		value: 'RESOURCE_ENTRY_CREATED_BY',
		label: 'Who created the entry',
		naturalType: 'uuid' as const
	},
	{
		value: 'RESOURCE_ENTRY_COLLECTION_ID',
		label: 'Which collection the entry belongs to',
		naturalType: 'uuid' as const
	},
	{ value: 'RESOURCE_ENTRY_LOCALE', label: 'Entry language', naturalType: 'string' as const },
	{
		value: 'RESOURCE_ENTRY_PUBLISHED_AT',
		label: 'When the entry was published',
		naturalType: 'datetime' as const
	},
	{ value: 'RESOURCE_COLLECTION_ID', label: 'Collection ID', naturalType: 'uuid' as const },
	{
		value: 'RESOURCE_COLLECTION_SLUG',
		label: 'Collection URL name',
		naturalType: 'string' as const
	},
	{
		value: 'RESOURCE_COLLECTION_CREATED_BY',
		label: 'Who created the collection',
		naturalType: 'uuid' as const
	},
	{
		value: 'RESOURCE_COLLECTION_IS_LOCALIZED',
		label: 'Collection supports multiple languages',
		naturalType: 'boolean' as const
	},
	{ value: 'RESOURCE_ASSET_ID', label: 'File ID', naturalType: 'uuid' as const },
	{
		value: 'RESOURCE_ASSET_UPLOADED_BY',
		label: 'Who uploaded the file',
		naturalType: 'uuid' as const
	},
	{ value: 'RESOURCE_ASSET_MIME_TYPE', label: 'File type', naturalType: 'string' as const },
	{ value: 'RESOURCE_ASSET_FILE_SIZE', label: 'File size', naturalType: 'number' as const },
	{ value: 'ENVIRONMENT_CURRENT_TIME', label: 'Current time', naturalType: 'datetime' as const },
	{ value: 'ENVIRONMENT_IP_ADDRESS', label: "User's IP address", naturalType: 'string' as const },
	{ value: 'ENVIRONMENT_USER_AGENT', label: "User's browser", naturalType: 'string' as const },
	{ value: 'ACTION_TYPE', label: 'Action being performed', naturalType: 'string' as const }
];

export const OPERATOR_LABELS: Record<string, string> = {
	EQ: 'is exactly',
	NE: 'is not',
	GT: 'is greater than',
	GTE: 'is at least',
	LT: 'is less than',
	LTE: 'is at most',
	IN: 'is one of',
	NOT_IN: 'is not one of',
	CONTAINS: 'contains',
	STARTS_WITH: 'starts with',
	ENDS_WITH: 'ends with',
	REGEX: 'matches pattern',
	IS_NULL: 'is empty / not set',
	IS_NOT_NULL: 'is set',
	EQ_CONTEXT_REF: 'is the same as'
};

export const CONTEXT_REF_LABELS: Record<string, string> = {
	SUBJECT_ID: 'the current user',
	SUBJECT_ROLE: "the current user's role",
	SUBJECT_STATUS: "the current user's status",
	SUBJECT_CREATED_AT: 'when the current user was created',
	RESOURCE_ENTRY_ID: 'this entry',
	RESOURCE_ENTRY_STATUS: "this entry's status",
	RESOURCE_ENTRY_CREATED_BY: 'who created this entry',
	RESOURCE_ENTRY_COLLECTION_ID: "this entry's collection",
	RESOURCE_ENTRY_LOCALE: "this entry's language",
	RESOURCE_ENTRY_PUBLISHED_AT: 'when this entry was published',
	RESOURCE_COLLECTION_ID: 'this collection',
	RESOURCE_COLLECTION_SLUG: "this collection's URL name",
	RESOURCE_COLLECTION_CREATED_BY: 'who created this collection',
	RESOURCE_COLLECTION_IS_LOCALIZED: 'whether this collection is localized',
	RESOURCE_ASSET_ID: 'this file',
	RESOURCE_ASSET_UPLOADED_BY: 'who uploaded this file',
	RESOURCE_ASSET_MIME_TYPE: "this file's type",
	RESOURCE_ASSET_FILE_SIZE: "this file's size",
	ENVIRONMENT_CURRENT_TIME: 'the current time',
	ENVIRONMENT_IP_ADDRESS: 'the current IP address',
	ENVIRONMENT_USER_AGENT: 'the current browser',
	ACTION_TYPE: 'the action being performed'
};

export type NaturalType = 'string' | 'number' | 'boolean' | 'datetime' | 'uuid';

export function getNaturalType(attributePath: string): NaturalType {
	const attr = ATTRIBUTE_PATHS.find((a) => a.value === attributePath);
	return attr?.naturalType ?? 'string';
}

export function getAttributeLabel(attributePath: string): string {
	return ATTRIBUTE_PATHS.find((a) => a.value === attributePath)?.label ?? attributePath;
}

export function getOperatorLabel(operator: string): string {
	return OPERATOR_LABELS[operator] ?? operator;
}

export function getContextRefLabel(path: string): string {
	return CONTEXT_REF_LABELS[path] ?? path;
}

export type RuleValue = {
	stringValue?: string;
	numberValue?: number;
	booleanValue?: boolean;
	dateTimeValue?: string;
	uuidValue?: string;
	arrayValue?: string[];
	contextReferencePath?: string;
};

export function buildValue(
	operator: string,
	naturalType: NaturalType,
	rawValue: string | boolean | number | string[] | undefined
): RuleValue | undefined {
	if (operator === 'IS_NULL' || operator === 'IS_NOT_NULL') {
		return undefined;
	}
	if (operator === 'EQ_CONTEXT_REF') {
		return { contextReferencePath: String(rawValue) };
	}
	if (operator === 'IN' || operator === 'NOT_IN') {
		const arr = Array.isArray(rawValue)
			? rawValue
			: String(rawValue)
					.split(',')
					.map((s) => s.trim())
					.filter(Boolean);
		return { arrayValue: arr };
	}
	if (naturalType === 'boolean') {
		return { booleanValue: Boolean(rawValue) };
	}
	if (naturalType === 'number') {
		const num = Number(rawValue);
		return { numberValue: isNaN(num) ? 0 : num };
	}
	if (naturalType === 'datetime') {
		return { dateTimeValue: String(rawValue) };
	}
	if (naturalType === 'uuid') {
		return { uuidValue: String(rawValue) };
	}
	return { stringValue: String(rawValue ?? '') };
}

export function readValue(
	value: RuleValue | undefined,
	operator: string
): string | boolean | number | string[] | undefined {
	if (!value) return undefined;
	if (operator === 'EQ_CONTEXT_REF') {
		return value.contextReferencePath ?? '';
	}
	if (value.arrayValue !== undefined) return value.arrayValue;
	if (value.booleanValue !== undefined) return value.booleanValue;
	if (value.numberValue !== undefined) return value.numberValue;
	if (value.dateTimeValue !== undefined) return value.dateTimeValue;
	if (value.uuidValue !== undefined) return value.uuidValue;
	if (value.stringValue !== undefined) return value.stringValue;
	return undefined;
}

export function valueToDisplayString(value: RuleValue | undefined): string {
	if (!value) return '';
	if (value.arrayValue !== undefined) return value.arrayValue.join(', ');
	if (value.booleanValue !== undefined) return value.booleanValue ? 'true' : 'false';
	if (value.numberValue !== undefined) return String(value.numberValue);
	if (value.dateTimeValue !== undefined) return value.dateTimeValue;
	if (value.uuidValue !== undefined) return value.uuidValue;
	if (value.stringValue !== undefined) return value.stringValue;
	if (value.contextReferencePath !== undefined)
		return getContextRefLabel(value.contextReferencePath);
	return '';
}

export function ruleToSentence(
	attributePath: string,
	operator: string,
	value: RuleValue | undefined
): string {
	const attrLabel = getAttributeLabel(attributePath);
	const opLabel = getOperatorLabel(operator);

	if (operator === 'IS_NULL' || operator === 'IS_NOT_NULL') {
		return `${attrLabel} ${opLabel}`;
	}
	if (operator === 'EQ_CONTEXT_REF') {
		return `${attrLabel} ${opLabel} ${getContextRefLabel(value?.contextReferencePath ?? '')}`;
	}

	const valStr = valueToDisplayString(value);
	return `${attrLabel} ${opLabel} "${valStr}"`;
}

export function policyToSentence(
	resourceType: string,
	actionType: string,
	effect: string,
	ruleConnector: string,
	rules: Array<{ attributePath: string; operator: string; value?: RuleValue }>
): string {
	const action = actionType.toLowerCase().replace(/_/g, ' ');
	const resource = resourceType.toLowerCase();
	const eff = effect === 'ALLOW' ? 'Allow' : 'Block';

	if (rules.length === 0) {
		return `${eff} ${action} on ${resource} — applies to everyone.`;
	}

	const connector = ruleConnector === 'AND' ? ' and ' : ' or ';
	const ruleTexts = rules.map((r) => ruleToSentence(r.attributePath, r.operator, r.value));
	return `${eff} ${action} on ${resource} when: ${ruleTexts.join(connector)}`;
}
