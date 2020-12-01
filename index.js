
// const regExp = /(\s*)?"(?<key>[^"]+)"(\s+)?("(?<value>[^"]+)"$)?/;
const regExp = /^(\s*)?"(?<k>[^"]+)"(\s*)?((?<v>.+))?(\s*)?(\[.*\])?(\s*)?(\/\/.*)?(\s*)?$/i

function parser(strings) {
    const data = {}
    while (true) {
        const string = strings.shift()
        if (string === undefined) return data
        // string = string.replace(/\s*\/\/.*$/, '')
        const clear = string.replace(/\s+/g, ' ').trim()
        if (clear == '}') return data
        if (clear != '{') {
            if (clear[0] == '$') {
                const args = clear.replace(/\s*\/\/.*$/, '').split(' ')
                const k = args.shift()
                const v = args.join(' ').replace(/\"/g, '').replace(/\\+/g, '/')
                data[k] = v
                continue
            }

            if (clear.split(' ')[0] == 'include') {
                if (!data.includes) data.includes = []
                data.includes.push(clear.replace(/^\s*include\s*/i, ''))
            }

            const match = regExp.exec(string)
            if (!match) continue
            // @ts-ignore
            const { groups: { k, v } } = match
            // console.log('key, value', k, v)
            if (!v) {
                if (!data[k]) data[k] = {}
                Object.assign(data[k], parser(strings))
            } else {
                data[k] = v.replace(/\\+/g, '/').replace(/\"/g, '').trim()
            }
        }
    }
}

/**
 * parse vmt to obj
 * @param {String} text 
 * @returns {object}
 */
function parse(text) {
    const string = JSON.stringify(parser(text.split('\n')), null, '\t')
        .replace(/"([\w\-]+)":/g, ($0, $1) => ('"' + $1.toLowerCase() + '":'))
    return JSON.parse(string)
}

exports.parse = parse