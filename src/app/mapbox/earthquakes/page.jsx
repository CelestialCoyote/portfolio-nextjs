import EarthquakesMap from "./components/earthquakes-map";


export default async function Earthquakes() {
	return (
		<div className="flex flex-col bg-blue-500">
			<div className="h-screen px-12 py-20">
				<EarthquakesMap />
			</div>
		</div>
	);
};
