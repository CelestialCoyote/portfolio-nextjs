import BasicMap from "./basic-map";


export default function ReactMap() {

    return (
        <main className="flex flex-col bg-blue-300 h-screen w-full px-12 py-20">
            <div className="text-3xl text-center font-bold mb-4">
                React Map
            </div>

            <BasicMap />
        </main>
    );
};
