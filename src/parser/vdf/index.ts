import { isArray, isNumber, REGEXP, sleep } from '../utils'
export function vdf(str) {
	return parse(str
		.replace(/\s*\/{2,}\s*.*$/gm, '')
		.replace(/\n\s*((?!("|\s|\{|\})))/g, '')
		.split('\n'))
}

async function parse(strings: Array<string>): Promise<Record<string, any>> {
	const data = {}
	while (true) {
		await sleep()
		const string = strings.shift()
		if (string === undefined) return data
		if (string.startsWith('//')) continue
		const array = string.replace(/\\+/g, '/').replace(/[\s\t]+/g, ' ').trim().split(/\"\s*\"/).map(s => s.replace(/\"/g, ''))
		// const array = string.match(/".+?"/g) || []//.replace(/\\+/g, '/').trim().split(/\"\s*\"/).map(s => s.replace(/\"/g, ''))
		const [key, ...values] = array//.map(s => s.replace(/"/g, ''))
		if (key === '{' || !key) continue
		else if (key === '}') return data
		else if (key.startsWith('//')) continue
		const name = key.toLowerCase()
		const [value, comment] = values.join(' ').split(' //').map(s => s.trim())
		if (comment) console.log('#', comment)
		if (!values.length) {
			data[name] = Object.assign(data[name] || {}, await parse(strings))
		} else {
			if (isNumber(value)) {
				data[name] = Number(value)
			} else if (isArray(value)) {
				data[name] = value.match(REGEXP.numbers).map(n => Number(n))
			} else {
				data[name] = value
			}
		}
	}
}