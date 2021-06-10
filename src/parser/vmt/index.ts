import { isArray, isNumber, REGEXP, sleep } from "../utils"

export async function vmt(str: string): Promise<Record<string, string | number | Array<number>>> {
	str = str.toLowerCase()
	const strings = str.split('\n')
	const data = {}
	while (true) {
		await sleep()
		const string = strings.shift()
		if (!string) return data
		const [key, ...values] = string
			.replace(/\s+/g, ' ')
			.replace(/\\+/g, '/')
			.replace(/\"/g, '')
			.trim()
			.split(' ')
		if (key === '{') continue
		else if (key === '}') return data
		if (key.startsWith('//')) continue
		const [value, comment] = values.join(' ').split('// ').map(s => s.trim())
		if (comment) console.log('#', comment)
		const name = key.replace('$', '')
		if (isNumber(value)) {
			data[name] = Number(value)
		} else if (isArray(value)) {
			data[name] = value.match(REGEXP.numbers).map(s => Number(s))
		} else {
			data[name] = value
		}
	}
}