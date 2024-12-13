import NasaImageResults from '@/app/components/Nasa/NasaImageResults';


export default async function SearchLibrary({ params }) {
	const response = await fetch(`https://images-api.nasa.gov/search?media_type=image&q=${params.searchTerm}`);

	console.log(`searchParams: ${params.searchTerm}`)

	if (!response.ok) {
		throw new Error("Error fetching data");
	}

	const data = await response.json();
	const items = data.collection.items;

	return (
		<div className="flex flex-col h-[calc(100vh-5rem)] w-full items-center">
			<div
				className="
				flex
				flex-col
				items-center
				overflow-y-auto
				no-scrollbar
				mb-6
			"
			>
				<NasaImageResults items={items} search={params.searchTerm} />
			</div>
		</div>
	);
};
