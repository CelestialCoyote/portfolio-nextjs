import ScalesMap from "./scales-map";


export default function ZipCodeTestMap() {
    return (
        <main className="flex flex-col h-screen w-full px-6 py-16">
            <div className="text-3xl text-center font-bold mt-2 mb-4">
                Scales Test Map
            </div>

            <ScalesMap />
        </main>
    );
};
