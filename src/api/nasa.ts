export interface ApodData {
	date: string;
	explanation: string;
	hdurl: string;
	media_type: string;
	title: string;
	url: string;
	copyright?: string;
}


export const getAPODData = async (): Promise<ApodData | null> => {
	const date = new Date();
	const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

	try {
		const response = await fetch(
			`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${currentDate}`
		);

		if (!response.ok) {
			throw new Error("Failed to fetch APOD data");
		}

		return await response.json();
	} catch (error) {
		console.error(error);
		return null;
	}
}
