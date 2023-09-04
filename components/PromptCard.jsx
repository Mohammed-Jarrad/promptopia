'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const PromptCard = ({ data, handleClickTag, handleEdit, handleDelete }) => {
	const [copied, setCopied] = useState('')
	const { data: session } = useSession()
	const pathName = usePathname()
	const router = useRouter()

	const handleCopy = () => {
		setCopied(data.prompt)
		navigator.clipboard.writeText(data.prompt)
		setTimeout(() => setCopied(''), 3000)
	}

	const handleProfileClick = () => {
		const {
			creator: { _id: cardUserId, username: cardUserName },
		} = data
		if (cardUserId === session?.user.id) return router.push('/profile')
		router.push(`/profile/${cardUserId}?name=${cardUserName}`)
	}

	if (data)
		return (
			<div className="prompt_card flex flex-col ">
				<div className="flex-between mb-5">
					<div className="flex items-start gap-2 cursor-pointer" onClick={() => handleProfileClick()}>
						<Image
							src={data?.creator.image}
							width={40}
							height={40}
							alt="user_image"
							className="rounded-full object-contain"
						/>
						<div className="flex flex-col gap-[1px] items-start">
							<h2 className="text-sm font-semibold font-satoshi">{data?.creator.username}</h2>
							<p className="text-sm font-medium text-gray-500">{data?.creator.email}</p>
						</div>
					</div>
					<button className="copy_btn" onClick={handleCopy} type="button">
						<Image
							title="copy"
							src={copied == data?.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
							width={20}
							height={20}
							alt="copy_image"
						/>
					</button>
				</div>
				<p className="desc !text-[16px] font-inter">
					{data?.prompt?.split('\n')?.map((line, index) => (
						<span className="block" key={index}>
							{line}
						</span>
					))}
				</p>
				<p
					className="flex-1 flex flex-col justify-end mt-2 cursor-pointer blue_gradient"
					title={`Filter By ${data?.tag}`}
					onClick={() => handleClickTag && handleClickTag(data.tag)}
				>
					#{data?.tag}
				</p>

				{session?.user.id === data?.creator._id && pathName === '/profile' && (
					<div className="mt-5 flex items-center gap-2">
						<p
							onClick={() => handleEdit(data)}
							className="bg-green-gradient-img w-full text-center rounded-lg 
								py-1 px-3 text-sm cursor-pointer text-white"
						>
							Edit
						</p>
						<p
							onClick={() => handleDelete(data)}
							className="bg-red-gradient-img w-full text-center text-white 
									 rounded-lg py-1 px-3 text-sm cursor-pointer"
						>
							Delete
						</p>
					</div>
				)}
			</div>
		)
}

export default PromptCard
