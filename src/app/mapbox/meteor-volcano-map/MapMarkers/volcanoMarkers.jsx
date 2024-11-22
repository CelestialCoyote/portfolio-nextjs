"use client";


import { useState } from 'react';
import Image from 'next/image';
import { Marker, Popup } from 'react-map-gl';
import volcanoes from '@/app/mapbox/data/volcano.json';


export default function VolcanoMarkers({ volcanoOn }) {
	const [volcano, setVolcano] = useState(null);

	return (
		<>
			{volcanoOn && volcanoes.features.map((volcano, index) => (
				<Marker
					key={index}
					latitude={volcano.geometry.coordinates[1]}
					longitude={volcano.geometry.coordinates[0]}
					onClick={e => {
						e.originalEvent.stopPropagation();
						setVolcano(volcano);
					}}
				>
					<Image
						className="rounded-md w-5 h-5 cursor-pointer"
						src="/images/volcano.png"
						alt="Volcano Icon"
						width={25}
						height={25}
					/>
				</Marker>
			))}

			{volcano && (
				<Popup
					anchor="bottom"
					latitude={volcano.geometry.coordinates[1]}
					longitude={volcano.geometry.coordinates[0]}
					onClose={() => {
						setVolcano(null);
						console.log('pupup closed');
					}}
				>
					<div className="flex flex-col text-black bg-slate-200">
						<div className="flex">
							<p className="font-bold mr-2">
								Name:
							</p>
							{volcano.properties.NAME_}
						</div>
						<div className="flex">
							<p className="font-bold mr-2">
								Location:
							</p>
							{volcano.properties.LOCATION}
						</div>
						{/* <div className="flex">
			<p className="font-bold mr-2">
				Country:
			</p>
			{meteorSite.properties.country}
		</div>
		<div className="flex">
			<p className="font-bold mr-2">
				Target Rock:
			</p>
			{meteorSite.properties.target_rock}
		</div>
		<div className="flex">
			<p className="font-bold mr-2">
				Diameter (km):
			</p>
			{meteorSite.properties.diameter_km}
		</div>
		<div className="flex">
			<p className="font-bold mr-2">
				Age (millions years ago):
			</p>
			{meteorSite.properties.age_millions_years_ago}
		</div> */}
					</div>
				</Popup>
			)}
		</>
	);
};
