'use client'
import Profile from '@components/profile'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const MyProfile = () => {
	const [data, setData] = useState([])
	const router = useRouter()

	const handleEdit = ({ _id: cardId }) => {
		router.push(`/update-prompt?id=${cardId}`)
	}

	const handleDelete = async ({ _id: cardId }) => {
		try {
			const isConfirmed = confirm('Are you sure you want to delete this prompt?')
			if (isConfirmed) {
				await fetch(`/api/prompt/${cardId}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const filterdData = data.filter(card => card._id !== cardId)
				setData(filterdData)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		// this function is work sucessfully!
		const fetchDataForMyProfile = async () => {
			try {
				const res = await fetch(`/api/prompt?creator=${localStorage.user}`)
				const Myprompts = await res.json()
				setData(Myprompts)
			} catch (error) {
				console.log(error)
			}
		}
		fetchDataForMyProfile()
	}, [])

	return (
		<Profile
			handleEdit={handleEdit}
			handleDelete={handleDelete}
			name={'My'}
			desc={'Welcome to your personalized profile page.'}
			data={data}
		/>
	)
}

export default MyProfile
