"use client";

import { useState } from "react";


export default function NasaImageSearch({ getSearchResults }) {
	const [query, setQuery] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch(`/api/nasa/image?query=${query}`)
		const data = await response.json();

		console.log(`searchData: ${JSON.stringify(data)}`);

		getSearchResults(data);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full px-12 mb-8 gap-12 mt-6"
		>
			<input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				type="text"
				placeholder="subject i.e. Space Shuttle"
				className="w-full h-14 pl-6 rounded-lg placeholder-gary-500 outline-none bg-transparent border-red-300 border-2"
			/>
			<button
				disabled={!query}
				type="submit"
				className="w-24 rounded-lg text-amber-600 disabled:text-gray-400 border-green-300 border-2"
			>
				Search
			</button>
		</form>
	);
};
