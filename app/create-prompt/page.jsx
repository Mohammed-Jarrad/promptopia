'use client'
import Form from '@components/Form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CreatePrompt = () => {
	const { data: session } = useSession()
	const router = useRouter()
	const [submitting, setSubmitting] = useState(false)
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	})

	const createPrompt = async e => {
		e.preventDefault()
		setSubmitting(true)
		try {
			const res = await fetch(`/api/prompt/new`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
					userId: session?.user.id,
				}),
			})
			if (res.ok) {
				router.push('/')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Form
			type={'Create'}
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	)
}

export default CreatePrompt
