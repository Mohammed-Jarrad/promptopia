'use client'
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const Nav = () => {
	const { data: session } = useSession()
	const [providers, setProviders] = useState(null)
	const [showDropMenu, setShowDropMenu] = useState(false)
	const dropDownRef = useRef(null)
	const imageRef = useRef(null)

	const toggleDropMenu = () => setShowDropMenu(p => !p)

	useEffect(() => {
		;(async () => {
			const res = await getProviders()
			setProviders(res)
		})()
	}, [])

	useEffect(() => {
		const handleClick = e =>
			dropDownRef.current &&
			!dropDownRef.current.contains(e.target) &&
			imageRef.current &&
			!imageRef.current.contains(e.target) &&
			setShowDropMenu(false)
		window.addEventListener('mousedown', handleClick)
		return () => window.removeEventListener('mousedown', handleClick)
	}, [])

	useEffect(() => {
		if (session?.user) localStorage.setItem('user', session.user.id)
	}, [session?.user])

	return (
		<nav className="flex-between w-full pt-3 mb-16">
			<Link href={'/'} className="flex-center gap-2">
				<Image
					src={'/assets/images/logo.svg'}
					alt="promptopia logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo_text">Propmtopia</p>
			</Link>

			{/* Desktop Navigation */}
			<div className="sm:flex hidden ">
				{session?.user ? (
					<div className="flex gap-2 md:gap-6">
						<Link href={'/create-prompt'} className="black_btn">
							Create Prompt
						</Link>
						<button type="button" className="outline_btn" onClick={signOut}>
							Sign Out
						</button>
						<Link href={'/profile'}>
							<Image
								src={session.user.image}
								width={37}
								height={37}
								className="rounded-full object-contain"
								alt="profile image"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map(provider => (
								<button
									key={provider.id}
									type="button"
									className="black_btn"
									onClick={() => signIn(provider.id)}
								>
									Sign In With Google
									<img src="/assets/icons/google.svg" className="w-8 ml-2"/>
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div>
						<Image
							src={session.user.image}
							width={37}
							height={37}
							className="rounded-full object-contain cursor-pointer"
							alt="profile image"
							onClick={toggleDropMenu}
							ref={imageRef}
						/>

						<div className={`dropdown_wrapper`} ref={dropDownRef}>
							<div className={`dropdown ${showDropMenu ? 'clip-path-full' : 'clip-path-hidden'}`}>
								<Link href={'/profile'} className="dropdown_link" onClick={toggleDropMenu}>
									My Profile
								</Link>
								<Link href={'/profile'} className="dropdown_link" onClick={toggleDropMenu}>
									Create Post
								</Link>
								<button
									className="black_btn mt-2 w-full"
									onClick={() => {
										toggleDropMenu()
										signOut()
										localStorage.removeItem('user')
									}}
								>
									Sign Out
								</button>
							</div>
						</div>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map(provider => (
								<button
									key={provider.id}
									type="button"
									className="black_btn"
									onClick={() => signIn(provider.id)}
								>
									Sign In With Google
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	)
}

export default Nav
