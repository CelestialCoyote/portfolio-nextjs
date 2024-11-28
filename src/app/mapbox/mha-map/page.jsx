import MHAMap from "./mha-map";


export const metadata = {
    title: "MustWants - Coverage Map",
    description: "Current coverage of MustWants by states."
};


const baseURL = process.env.NEXT_PUBLIC_API_URL;

const getMHAData = async () => {
    try {
        const res = await fetch(
            `${baseURL}/data_analysis/get_mha`,
            { cache: 'no-store' }
        );

        let mhaData = await res.json();
        // console.log(mhaData);

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        };

        return mhaData;
    } catch (error) {
        console.log(error)
    };
};


export default async function MilitaryHousingAllowanceMap() {
    const mhaData = await getMHAData();

    return (
        // <main className="flex flex-col w-full h-screen px-12 py-16">
        <main className="flex flex-col w-full h-screen max-w-screen-xl mx-auto pt-16 px-[15px] lg:px-12 md:pb-24">
            <div className="text-3xl text-center font-bold h-[5%] mb-4">
                Miltary Housing Allowance Map
            </div>

            <div className="h-[93%] max-h-[93%]">
                <MHAMap mhaData={mhaData} />
            </div>
        </main>
    );
};
