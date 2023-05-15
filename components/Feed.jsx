'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';
import { CardContent, CardHeader, Skeleton } from '@mui/material';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [allPosts, setAllPosts] = useState([]);
	const [fetchingPosts, setFetchingPosts] = useState(false);

	// Search states
	const [searchText, setSearchText] = useState('');
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);

	const fetchPosts = async () => {
		setFetchingPosts(true);
		const response = await fetch('/api/prompt');
		const data = await response.json();

		setAllPosts(data);
		setFetchingPosts(false);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filterPrompts = (searchtext) => {
		const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
		return allPosts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.tag) ||
				regex.test(item.prompt)
		);
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value);
				setSearchedResults(searchResult);
			}, 500)
		);
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);

		const searchResult = filterPrompts(tagName);
		setSearchedResults(searchResult);
	};

	return (
		<section className="feed">
			<form
				className="relative w-full flex-center"
				onSubmit={handleSearchChange}>
				<input
					type="text"
					placeholder="Search for a tag or username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{/* All Prompts */}
			{fetchingPosts ? (
				<div className="mt-16 prompt_layout">
					{[...Array(6).keys()].map((i) => (
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
			) : searchText ? (
				<PromptCardList
					data={searchedResults}
					handleTagClick={handleTagClick}
				/>
			) : (
				<PromptCardList data={allPosts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;
