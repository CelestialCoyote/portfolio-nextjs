import MHAMap from "./mha-map";


export const metadata = {
    title: "MustWants - Coverage Map",
    description: "Current coverage of MustWants by states."
};


export default async function MilitaryHousingAllowanceMap() {
    return (
        // <main className="flex flex-col w-full h-screen px-12 py-16">
        <main className="flex flex-col w-full h-screen max-w-screen-xl mx-auto pt-16 px-[15px] lg:px-12 md:pb-24">
            <div className="text-3xl text-center font-bold h-[5%] mb-4">
                Miltary Housing Allowance Map
            </div>

            <div className="h-[93%] max-h-[93%]">
                <MHAMap />
            </div>
        </main>
    );
};
