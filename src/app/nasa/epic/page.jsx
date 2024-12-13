import Image from 'next/image';
import data from './epicTestData.json';


// const getAPODData = async () => {
// 	const date = new Date();
// 	let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
// 	//console.log(currentDate)

// 	try {
// 		const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${currentDate}`);

// 		if (!response.ok) {
// 			throw new Error("Failed to fetch data");
// 		} else {
// 			console.log("data fetched");
// 		};

// 		return response.json();
// 	} catch (error) {
// 		console.log(error);
// 	}
// };


export default async function Epic() {
	const epicData = data;

	//2023-09-25
	//const year = epicData[0].date.slice(0, 4);
	//const month = epicData[0].date.slice(5, 7);
	//const day = epicData[0].date.slice(8, 10);

	//console.log(`year: ${year}, month: ${month}, day: ${day}`);

	if (!epicData) return <p>No photo data</p>

	//https://epic.gsfc.nasa.gov/archive/${type}/${year}/${month}/${day}/png/${image.image}.png 2023-09-25
	//https://epic.gsfc.nasa.gov/archive/natural/2023/09/25/png/epic_1b_20230925005516.png
	//https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=DEMO_KEY
	//https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=DEMO_KEY

	//https://api.nasa.gov/EPIC/archive/enhanced/2019/05/30/png/epic_1b_20190530011359.png?api_key=DEMO_KEY

	return (
		<div className='min-h-screen border-2 pt-16'>
			<h1 className='text-3xl text-center mt-4 mb-6'>
				NASA Epic
			</h1>

			{epicData && epicData.map(epic => (
				// <div
				// 	key={epic.identifier}
				// 	className="flex flex-col text-white border-green-500 border-2"
				// >
				// 	<p className="text-purple-500">Identifier: {epic.identifier}</p>
				// 	<p>Caption: {epic.caption}</p>
				// 	<p>Image: {epic.image}</p>
				// 	<p>Version: {epic.version}</p>
				// </div>

				<div
					key={epic.identifier}
					className="
						flex
						flex-col
						w-72
						overflow-hidden
						rounded-lg
						border-purple-400
						border-2
					"
				>
					<div className="flex justify-center w-full h-48">
						<Image
							className="w-auto h-full rounded-2xl p-2"
							src={`https://epic.gsfc.nasa.gov/archive/natural/${epic.date.slice(0, 4)}/${epic.date.slice(5, 7)}/${epic.date.slice(8, 10)}/png/${epic.image}.png`}
							alt={'epic image'}
							placeholder="blur"
							blurDataURL={`https://epic.gsfc.nasa.gov/archive/natural/${epic.date.slice(0, 4)}/${epic.date.slice(5, 7)}/${epic.date.slice(8, 10)}/png/${epic.image}.png`}
							width="0"
							height="0"
							sizes="100vh"
						/>
					</div>
					<div className='flex flex-col justify-between items-center h-48 p-4'>
						<div>
							<p className="text-purple-500">Identifier: {epic.identifier}</p>
							<p>Image: {epic.image}</p>
							<p>Caption: {epic.caption}</p>
							<p>Image: {epic.image}</p>
							<p>Version: {epic.version}</p>
						</div>
					</div>
				</div>
			))}

		</div>
	);
};
