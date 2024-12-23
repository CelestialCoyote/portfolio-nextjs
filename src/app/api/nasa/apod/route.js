import { NextResponse } from "next/server";


export async function GET() {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    try {
        console.log(`apod current date: ${currentDate}`);
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${currentDate}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data from NASA API");
        }

        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
