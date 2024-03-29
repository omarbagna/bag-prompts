'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const [submitting, setSubmitting] = useState(false);
	const [fetchingPosts, setFetchingPosts] = useState(false);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			setFetchingPosts(true);
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setPosts(data);
			setFetchingPosts(false);
		};

		if (session?.user.id) fetchPosts();
	}, []);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm(`Are you sure you want to delete post?`);

		if (hasConfirmed) {
			setSubmitting(true);

			try {
				const response = await fetch(`/api/prompt/${post._id.toString()}`, {
					method: 'DELETE',
				});

				const filteredPosts = posts.filter((p) => p._id !== post._id);

				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			} finally {
				setSubmitting(false);
			}
		}
	};

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page"
			data={posts}
			fetchingPosts={fetchingPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
