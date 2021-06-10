import { vdf, vmt } from "../parser"

const vmtStr = `data weapondecal
{
	// comment
	///////////////////// -- ///////////////////////
	basetexture models\\weapons\\customization\\stickers\\rmr2020\\nip_gold
	$decalstyle 4 // comment
	colortint "[200 200 200]"
	wearbias 0.06
	envmap "env_cubemap"
}`

const vdfStr = `"lang"
{
	"Language" "English"
	"Tokens"
	{
		// ---------------------------------------------------------------------------------------------
		///////////////////// -- ///////////////////////
		// big comment
		
		"oneWord"	"Main Menu Background Scenery"
		"multi word"	"Change Background Scenery"
	}
	"Tokens"
	{
		"multi line"	"This setting allows you to customize 
		the main menu background scenery which sets the mood for visual experience of your entire game."
	}
}`

describe('test parsers', () => {
	test('vmt', async () => {
		const data = await vmt(vmtStr)
		expect(data).toEqual({
			data: 'weapondecal',
			basetexture: 'models/weapons/customization/stickers/rmr2020/nip_gold',
			decalstyle: 4,
			colortint: [200, 200, 200],
			wearbias: 0.06,
			envmap: 'env_cubemap'
		})
	})

	test('vdf', async () => {
		const data = await vdf(vdfStr)
		expect(data).toEqual({
			lang: {
				language: 'English',
				tokens: {
					oneword: 'Main Menu Background Scenery',
					'multi word': 'Change Background Scenery',
					'multi line': 'This setting allows you to customize the main menu background scenery which sets the mood for visual experience of your entire game.'
				}
			}
		})
	})
})