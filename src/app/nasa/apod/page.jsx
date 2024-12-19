import Image from "next/image";


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
    };
}


export default async function Apod() {
    const data = await getAPODData();
    // console.log(data)

    if (!data) return <p>No photo data</p>

    return (
        <div className="bg-slate-400 h-[500px] pt-20">
            <h1 className='text-3xl text-center mt-4 mb-6'>
                Astronomy Photo of the Day
            </h1>

            <div className="flex justify-center mt-10">
                {data.title}
            </div>

            {/* <div className='grid lg:grid-cols-2 lg:gap-4 p-8'>
                {data?.media_type === 'video' ? (
                    <div className='relative h-[50vh] mb-4 lg:mb-0'>
                        <iframe
                            className='absolute top-0 left-0 w-full rounded-t-lg lg:rounded-lg'
                            src={data?.url}
                            title={data?.title}
                            width='560'
                            height='349'
                            frameBorder='0'
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <div className='flex items-center justify-center rounded-lg mb-4 lg:mb-0'>
                        <Image
                            className="w-full h-full object-contain object-center rounded-lg"
                            src={data?.url || '/NASA-logo.svg'}
                            alt={data?.title || 'NASA APOD Image'}
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                )}

                <div className='p-4 bg-black rounded-b-lg sm:p-8 lg:rounded-lg'>
                    <p className='pt-2 text-primary lg:pt-0'>
                        {data?.date}
                    </p>
                    
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
            </div> */}
        </div>
    );
}
