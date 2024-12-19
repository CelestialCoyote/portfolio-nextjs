import type { NextApiRequest, NextApiResponse } from 'next';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`,
          { headers: { accept: 'application/json' } }
        );

        const data = await response.json();

        if (!response.ok) {
          res.status(response.status).json({
            message: `Error ${response.status}: ${
              data?.error?.message || response.statusText
            }`,
          });
        } else {
          res.status(200).json(data);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Oops... Something went wrong' });
      }
      break;
    }
    default:
      res.setHeader('Allow', 'GET');
      res
        .status(405)
        .json({ message: `Error 405: Method ${method} Not Allowed` });
  }
};





// import { NextApiRequest, NextApiResponse } from 'next';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const date = new Date();
//     const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

//     try {
//         // Fetch data from NASA API using the server-side API key
//         const response = await fetch(
//             `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${currentDate}`
//         );

//         if (!response.ok) {
//             throw new Error('Failed to fetch APOD data');
//         }

//         const data = await response.json();
//         res.status(200).json(data); // Return the fetched data as the response
//     } catch (error) {
//         console.error('Error fetching APOD data:', error);
//         res.status(500).json({ error: 'Failed to fetch APOD data' });
//     }
// }




// export interface ApodData {
// 	date: string;
// 	explanation: string;
// 	hdurl: string;
// 	media_type: string;
// 	title: string;
// 	url: string;
// 	copyright?: string;
// }


// export const getAPODData = async (): Promise<ApodData | null> => {
// 	const date = new Date();
// 	const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

// 	try {
// 		const response = await fetch(
// 			`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${currentDate}`
// 		);

// 		if (!response.ok) {
// 			throw new Error("Failed to fetch APOD data");
// 		}

// 		return await response.json();
// 	} catch (error) {
// 		console.error(error);
// 		return null;
// 	}
// }
