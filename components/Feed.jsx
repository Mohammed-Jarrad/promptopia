'use client'
import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
	const [searchText, setSearchText] = useState('')
	const [searchResult, setSearchResult] = useState([])
	const [searchTimeout, setSearchTimeout] = useState(null)
	const [prompts, setPrompts] = useState([])

	const filterPrompts = text => {
		const reg = new RegExp(text, 'i')
		return prompts.filter(
			item => reg.test(item.creator.username) || reg.test(item.prompt) || reg.test(item.tag),
		)
	}
	const handleSearchChange = e => {
		clearTimeout(searchTimeout)
		setSearchText(e.target.value)
		setSearchTimeout(
			setTimeout(() => {
				setSearchResult(filterPrompts(e.target.value))
			}, 500),
		)
	}

	const handleTagClick = tag => {
		setSearchText(tag)
		setSearchResult(filterPrompts(tag))
	}

	const getAllPrompts = async () => {
		try {
			const res = await fetch('/api/prompt')
			const data = await res.json()
			if (res.ok) setPrompts(data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getAllPrompts()
	}, [])

	return (
		<section className="feed">
			<form onSubmit={e => e.preventDefault()} className="flex gap-2 items-stretch justify-center">
				<input
					type="text"
					onChange={handleSearchChange}
					value={searchText}
					placeholder="Search by tag or usernames..."
					className="search_input peer"
				/>
				{searchText && (
					<img
						onClick={() => {
							setSearchText('')
						}}
						src="/assets/icons/close.svg"
						className="cursor-pointer"
					/>
				)}
			</form>
			{searchText ? (
				<PromptsCardList data={searchResult} handleTagClick={handleTagClick} />
			) : (
				<PromptsCardList data={prompts} handleTagClick={handleTagClick} />
			)}
		</section>
	)
}

const PromptsCardList = ({ data, handleTagClick }) => {
	return (
		<div className="prompt_layout">
			{data?.map(card => (
				<PromptCard key={card._id} data={card} handleClickTag={handleTagClick} />
			))}
		</div>
	)
}

export default Feed
