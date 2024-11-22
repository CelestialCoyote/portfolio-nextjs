export const navData = [
	{
		id: 0,
		label: "Home",
		link: "/",
		auth: false,
		submenu: false,
		sublinks: []
	},
	{
		id: 1,
		label: "NASA",
		link: "/nasa",
		auth: false,
		submenu: true,
		sublinks: [
			{
                id: 0,
				label: "APOD",
				link: "/nasa/apod",
				icon: ""
			}
		]
	},
	{
		id: 2,
		label: "Map",
		link: "#",
		auth: false,
		submenu: true,
		sublinks: [
			{
                id: 0,
				label: "Volcanoes",
				link: "/mapbox/meteor-volcano-map",
				icon: ""
			},
			{
                id: 1,
				label: "Earthquakes",
				link: "/mapbox/earthquakes",
				icon: ""
			},
			{
                id: 2,
				label: "Basic Map",
				link: "/mapbox/basic-map",
				icon: ""
			},
			{
                id: 3,
				label: "Scales Map",
				link: "/mapbox/scales",
				icon: ""
			},
			{
                id: 4,
				label: "Boundaries",
				link: "/mapbox/select-coverage-area",
				icon: ""
			}
		]
	},
];
