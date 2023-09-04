import Prompt from "@models/prompt"

export const GET = async (req, res) => {
    const { id } = await req.params
    try {
        const prompts = await Prompt.find({ creator: id })
    } catch (error) {
        
    }
}