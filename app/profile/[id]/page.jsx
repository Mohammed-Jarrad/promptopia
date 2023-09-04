'use client'
import Profile from '@components/profile'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const UserProfile = () => {
	const [data, setData] = useState([])
    const username = useSearchParams().get('name')
    const userId = useParams().id 
 
	useEffect(() => {
		const fetchDataForUserProfile = async () => {
			try {
				const res = await fetch(`/api/prompt?creator=${userId}`)
				const userPrompts = await res.json()
				setData(userPrompts)
			} catch (error) {
				console.log(error)
			}
		}
		fetchDataForUserProfile()
	}, [])

	return (
		<Profile
			name={username }
			desc={`Welcome to ${username} personalized profile page.`}
			data={data}
 		/>
	)
}

export default UserProfile
