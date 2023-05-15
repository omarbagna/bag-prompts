'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const postId = searchParams.get('id');

	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(`/api/prompt/${postId}`, {
				method: 'GET',
			});
			const data = await response.json();

			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};

		if (postId) fetchPost();
	}, [postId]);

	const updatePrompt = async (e) => {
		e.preventDefault();

		if (!postId) return alert('Post ID not found');

		setSubmitting(true);

		try {
			const response = await fetch(`/api/prompt/${postId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push('/profile');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};

export default EditPrompt;
