// import Image from 'next/image';
// import { getAPODData } from '@/api/nasa';


// export default async function Apod() {
//     const data = await getAPODData();

//     if (!data) return <p>No photo data</p>;

//     return (
//         <div className="min-h-screen">
//             <h1 className="text-3xl text-center mt-4 mb-6">
//                 Astronomy Photo of the Day
//             </h1>

//             <div className="grid lg:grid-cols-2 lg:gap-4 p-8">
//                 {data.media_type === 'video' ? (
//                     <div className="relative h-[50vh] mb-4 lg:mb-0">
//                         <iframe
//                             src={data.url}
//                             title={data.title}
//                             width="560"
//                             height="349"
//                             className="absolute top-0 left-0 w-full rounded-t-lg lg:rounded-lg"
//                             frameBorder="0"
//                             allowFullScreen
//                         />
//                     </div>
//                 ) : (
//                     <div className="flex items-center justify-center rounded-lg mb-4 lg:mb-0">
//                         <a href={data.hdurl} className="rounded-lg lg:hidden">
//                             <Image
//                                 src={data.url}
//                                 alt={data.title}
//                                 width={0}
//                                 height={0}
//                                 sizes="100vh"
//                                 className="w-full h-auto"
//                             />
//                         </a>
//                         <div className="hidden lg:sticky lg:block lg:top-10">
//                             <a href={data.hdurl} className="rounded-lg">
//                                 <img
//                                     src={data.url}
//                                     alt={data.title}
//                                     loading="eager"
//                                     className="rounded-lg"
//                                 />
//                             </a>
//                         </div>
//                     </div>
//                 )}

//                 <div className="p-4 bg-black rounded-b-lg sm:p-8 lg:rounded-lg">
//                     <p className="pt-2 text-primary lg:pt-0">{data.date}</p>
//                     <h1 className="py-2 text-4xl font-medium text-gray-200 glow">
//                         {data.title}
//                     </h1>
//                     {data.copyright && (
//                         <h2 className="text-lg text-gray-400">
//                             {`Credit: ${data.copyright}`}
//                         </h2>
//                     )}
//                     <p className="pt-2 text-xl leading-relaxed text-gray-300">
//                         {data.explanation}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }




import Image from 'next/image';


const getAPODData = async () => {
	const date = new Date();
	let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
	//console.log(currentDate)

	try {
		const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${currentDate}`);

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		} else {
			console.log("data fetched");
		};

		return response.json();
	} catch (error) {
		console.log(error);
	}
};


export default async function Apod() {
	const data = await getAPODData();
	console.log(data)

	if (!data) return <p>No photo data</p>

	return (
		<div className='min-h-screen'>
			<h1 className='text-3xl text-center mt-4 mb-6'>Astronomy Photo of the Day</h1>

			<div className='grid lg:grid-cols-2 lg:gap-4 p-8'>
				{data?.media_type === 'video' ? (
					<div className='relative h-[50vh] mb-4 lg:mb-0'>
						<iframe
							src={data?.url}
							title={data?.title}
							width='560'
							height='349'
							className='absolute top-0 left-0 w-full rounded-t-lg lg:rounded-lg'
							frameBorder='0'
							allowFullScreen
						/>
					</div>
				) : (
					<div className='
						flex
						items-center
						justify-center
						rounded-lg
						mb-4
						lg:mb-0
						focus-within:outline-none
						focus-within:ring-2
						focus-within:ring-offset-0
						focus-within:ring-indigo-400
					'>
						<a
							href={data?.hdurl}
							className='
								rounded-lg
								lg:hidden
								focus:ring-0
								focus:ring-offset-0
								focus:ring-transparent'
						>
							<Image
								src={data?.url}
								alt={data?.title}
								width="0"
								height="0"
								sizes="100vh"
								className="w-full h-auto"
							/>
						</a>
						<div className='hidden lg:sticky lg:block lg:top-10'>
							<a
								href={data?.hdurl}
								className='rounded-lg focus:ring-0 focus:ring-offset-0 focus:ring-transparent'
							>
								<img
									src={data?.url}
									alt={data?.title}
									loading='eager'
									className='rounded-lg'
								/>
							</a>
						</div>
					</div>
				)}

				<div className='p-4 bg-black rounded-b-lg sm:p-8 lg:rounded-lg'>
					<p className='pt-2 text-primary lg:pt-0'>{data?.date}</p>
					<h1 className='py-2 text-4xl font-medium text-gray-200 glow'>
						{data?.title}
					</h1>
					{data?.copyright ? (
						<h2 className='text-lg text-gray-400'>{`Credit: ${data.copyright}`}</h2>
					) : null}
					<p className='pt-2 text-xl leading-relaxed text-gray-300'>
						{data?.explanation}
					</p>
				</div>
			</div>
			{/* </div> */}
		</div>
	);
}
