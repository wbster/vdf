export const REGEXP = {
	number: /^\-?\d*\.?\d+$/,
	numbers: /\-?\d*\.?\d+/g,
	array: /^\s*\[[\-\d\s]+\]\s*$/
}

export function isNumber(str: string) {
	return str.match(REGEXP.number)
}

export function isArray(str: string) {
	return str.match(REGEXP.array)
}

export async function sleep() {
	return new Promise(res => setImmediate(res))
}