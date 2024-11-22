"use client";


import { useState } from 'react';
import Image from 'next/image';
import { Marker, Popup } from 'react-map-gl';
import meteors from '@/app/mapbox/data/meteor.json';


export default function MeteorMarkers({ meteorOn }) {
	const [meteor, setMeteor] = useState(null);

	return (
		<>
			{meteorOn && meteors.features.map((meteor, index) => (
				<Marker
					key={index}
					latitude={meteor.geometry.coordinates[1]}
					longitude={meteor.geometry.coordinates[0]}
					onClick={e => {
						e.originalEvent.stopPropagation();
						setMeteor(meteor);
					}}
				>
					<Image
						className="rounded-md w-5 h-5 cursor-pointer"
						src="/images/meteor.png"
						alt="Meteor Icon"
						width={25}
						height={25}
					/>
				</Marker>
			))}

			{meteor && (
				<Popup
					anchor="bottom"
					latitude={meteor.geometry.coordinates[1]}
					longitude={meteor.geometry.coordinates[0]}
					onClose={() => {
						setMeteor(null);
						console.log('pupup closed');
					}}
				>
					<div className="flex flex-col text-black bg-slate-200">
						<div className="flex">
							<p className="font-bold mr-2">
								Name:
							</p>
							{meteor.properties.crater_name}
						</div>
						<div className="flex">
							<p className="font-bold mr-2">
								State:
							</p>
							{meteor.properties.state}
						</div>
						<div className="flex">
							<p className="font-bold mr-2">
								Country:
							</p>
							{meteor.properties.country}
						</div>
						<div className="flex">
							<p className="font-bold mr-2">
								Target Rock:
							</p>
							{meteor.properties.target_rock}
						</div>
						<div className="flex">
							<p className="font-bold mr-2">
								Diameter (km):
							</p>
							{meteor.properties.diameter_km}
						</div>
						<div className="flex">
							<p className="font-bold mr-2">
								Age (millions years ago):
							</p>
							{meteor.properties.age_millions_years_ago}
						</div>
					</div>
				</Popup>
			)}
		</>
	);
};
