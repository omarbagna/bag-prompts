'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
	const searchParams = useSearchParams();
	const userId = searchParams.get('id');

	const [posts, setPosts] = useState([]);
	const [fetchingPosts, setFetchingPosts] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			setFetchingPosts(true);
			const response = await fetch(`/api/users/${userId}/posts`);
			const data = await response.json();

			setPosts(data);
			setFetchingPosts(false);
		};

		if (userId) fetchPosts();
	}, []);

	return (
		<Profile
			name={params.username}
			fetchingPosts={fetchingPosts}
			desc={`Welcome to ${params.username}'s personalized profile page`}
			data={posts}
		/>
	);
};

export default UserProfile;
