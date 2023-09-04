import Link from "next/link"

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	return (
		<section className="w-full pb-10">
			<h1 className="head_text">
				<span className="blue_gradient">{type} Prompt</span>
			</h1>

			<p className="desc">
				{type} and share amazing prompts with the world, and let your imagination run wild with any
				AI-powered platform
			</p>

			<form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
				<label className="flex flex-col gap-2">
					<span className="font-semibold font-satoshi">Your AI Prompt</span>
					<textarea
						className="form_textarea"
						value={post.prompt}
						onChange={e => setPost({ ...post, prompt: e.target.value })}
						placeholder="Write your post here..."
						required
					/>
				</label>

				<label className="flex flex-col gap-2">
					<span className="font-semibold font-satoshi">
						{`Tag `} <span className="text-sm font-normal text-gray-400">{`(#product, #webdevelopment, #idea...)`}</span>
					</span>
					<input
						className="form_input"
						value={post.tag}
						onChange={e => setPost({ ...post, tag: e.target.value })}
						placeholder="#tag"
						required
					/>
				</label>

				<div className="flex-end gap-5 mb-5 mt-3">
					<Link href={'/'} className="text-sm text-gray-500 font-semibold">Cancel</Link>
					<button 
						className="bg-primary-orange py-1 px-3 rounded-full text-white"
						disabled={submitting}
						type="submit"
					>
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</section>
	)
}

export default Form
