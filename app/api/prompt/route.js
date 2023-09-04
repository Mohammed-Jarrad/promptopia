import Prompt from '@models/prompt'
import { connectDB } from '@utils/database'

export const GET = async (req, res) => {
	const { searchParams } = new URL(req.url)
	const creator = searchParams.get('creator')
	try {
		await connectDB()
		let prompts = []
		if (creator) {
			prompts = await Prompt.find({ creator }).populate('creator')
			return new Response(JSON.stringify(prompts), { status: 200 })
		} else {
			prompts = await Prompt.find({}).populate('creator')
			return new Response(JSON.stringify(prompts), { status: 200 })
		}
	} catch (error) {
		console.log(error)
		return new Response('Failed to get all prompts!', { status: 500 })
	}
}
