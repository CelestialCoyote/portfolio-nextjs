import MeteorVolcanoSitesMap from "./meteor-volcano-sites-map";


export default async function Mapbox() {
	return (
		<div className="flex flex-col bg-blue-500">
			<div className="h-screen m-4 py-20">
				<MeteorVolcanoSitesMap />
			</div>
		</div>
	);
};
