import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req, res) {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    try {
        // Fetch data from NASA API using the server-side API key
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${currentDate}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch APOD data');
        }

        const data = await response.json();
        res.status(200).json(data); // Return the fetched data as the response
    } catch (error) {
        console.error('Error fetching APOD data:', error);
        res.status(500).json({ error: 'Failed to fetch APOD data' });
    }
}
