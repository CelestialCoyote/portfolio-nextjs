import MeteorSitesMap from "./MeteorSitesMap";


export default async function Mapbox() {
	return (
		<div className="flex flex-col bg-blue-500">
			<div className="h-screen m-4 py-20">
				<MeteorSitesMap />
			</div>
		</div>
	);
};
