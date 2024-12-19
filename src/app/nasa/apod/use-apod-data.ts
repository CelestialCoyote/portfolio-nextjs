"use client";

import { useState, useEffect } from 'react';

type ApodData = {
    date: string;
    explanation: string;
    hdurl?: string;
    media_type: 'image' | 'video';
    title: string;
    url: string;
    copyright?: string;
};

type ApodPageHook = {
    data: ApodData | null;
    error: string | null;
    status: 'idle' | 'loading' | 'error' | 'success';
};

export default function useApodData(): ApodPageHook {
    const [data, setData] = useState<ApodData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

    useEffect(() => {
        const fetchData = async () => {
            setStatus('loading');
            try {
                const res = await fetch('/api/nasa/apod');
                if (!res.ok) {
                    const json = await res.json();
                    throw new Error(json.message || 'Failed to fetch data');
                }
                const result = await res.json();
                setData(result);
                setStatus('success');
            } catch (err: any) {
                setError(err.message || 'Unknown error');
                setStatus('error');
            }
        };

        fetchData();
    }, []);

    return { data, error, status };
}





// import { useQuery } from 'react-query';
// import { ApodData } from 'types';

// type ApodPageHook = () => {
//     data: ApodData;
//     error: Error;
//     status: 'idle' | 'error' | 'loading' | 'success';
// };


// export default function getApodData(): ApodPageHook() {
//     const { data, error, status } = useQuery<ApodData, Error>(
//         'apod',
//         async () => {
//             const res = await fetch('/api/nasa/apod');
//             if (!res.ok) {
//                 const json = await res.json();
//                 throw new Error(json.message);
//             }
//             return res.json();
//         }
//     );

//     return { data, error, status };
// };






// export interface ApodData {
//     date: string;
//     explanation: string;
//     hdurl: string;
//     media_type: string;
//     title: string;
//     url: string;
//     copyright?: string;
// }


// export const getAPODData = async (): Promise<ApodData | null> => {
//     try {
//         const response = await fetch('../../api/nasa'); // Call the server-side API route

//         if (!response.ok) {
//             throw new Error('Failed to fetch APOD data');
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching APOD data:', error);
//         return null;
//     }
// };
