import { CardContent, CardHeader, Skeleton } from '@mui/material';
import PromptCard from './PromptCard';

const Profile = ({
	name,
	desc,
	data,
	handleEdit,
	fetchingPosts,
	handleDelete,
}) => {
	return (
		<section className="w-full">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{name} Profile</span>
			</h1>
			<p className="desc text-left">{desc}</p>

			{fetchingPosts ? (
				<div className="mt-16 prompt_layout">
					{[...Array(4).keys()].map((i) => (
						<div className="prompt_card" key={i}>
							<CardHeader
								avatar={
									<Skeleton
										animation="wave"
										variant="circular"
										width={40}
										height={40}
									/>
								}
								title={
									<Skeleton
										animation="wave"
										height={10}
										width="80%"
										style={{ marginBottom: 6 }}
									/>
								}
								subheader={
									<Skeleton animation="wave" height={10} width="40%" />
								}
							/>

							<CardContent>
								<>
									<Skeleton
										animation="wave"
										height={10}
										style={{ marginBottom: 6 }}
									/>
									<Skeleton animation="wave" height={10} width="80%" />
								</>
							</CardContent>
						</div>
					))}
				</div>
			) : (
				<div className="mt-10 prompt_layout">
					{data.map((post) => (
						<PromptCard
							key={post._id}
							post={post}
							handleEdit={() => handleEdit && handleEdit(post)}
							handleDelete={() => handleDelete && handleDelete(post)}
						/>
					))}
				</div>
			)}
		</section>
	);
};

export default Profile;
