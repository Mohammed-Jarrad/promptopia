import Link from 'next/link'

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center gap-10">
			<p className=" w-fit py-2 px-4 text-white text-[100px] rounded-lg font-bold tracking-[5px] red_gradient md:text-[150px]">
				404
			</p>
			<p className="font-medium capitalize">This page is Not Found</p>

			<Link href={'/'} className="outline_btn">
				Go Home Page
			</Link>
		</div>
	)
}

export default NotFoundPage
