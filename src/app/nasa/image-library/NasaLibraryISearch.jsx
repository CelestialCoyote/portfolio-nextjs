"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function NasaLibrarySearch() {
	const [search, setSearch] = useState("");
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!search) return;

		router.push(`/nasa/library/${search}`);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full px-12 mb-8 gap-12 mt-6"
		>
			<input
				className="
					w-full
					h-14
					pl-6
					rounded-lg
					placeholder-purple-500
					outline-none
					bg-transparent
					border-purple-400
					border-2
				"
				type="text"
				placeholder="subject i.e. Space Shuttle"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button
				className="
					w-24
					rounded-lg 
					text-purple-500
					border-purple-400
					disabled:text-gray-700
					disabled:border-gray-700
					border-2
				"
				type="submit"
				disabled={!search}
			>
				Search
			</button>
		</form>
	);
};
