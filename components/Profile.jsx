import PromptCard from './PromptCard'

const Profile = ({ handleEdit, handleDelete, name, desc, data }) => {
	return (
		<section className="w-full">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{name} Profile</span>
			</h1>
			<p className="desc text-left">{desc}</p>

			<div className="mt-10 prompt_layout">
				{data?.map((card, index) => (
					<PromptCard
						key={card._id}
						data={card}
						handleClickTag={() => {}}
						handleDelete={handleDelete && handleDelete}
						handleEdit={handleEdit && handleEdit}
					/>
				))}
			</div>
		</section>
	)
}

export default Profile
