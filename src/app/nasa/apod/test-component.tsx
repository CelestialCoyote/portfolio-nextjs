import React from 'react';
import useApodData from './use-apod-data';

const TestComponent = () => {
    const { data, error, status } = useApodData();

    return (
        <div>
            <p>Status: {status}</p>
            {status === 'success' && <p>Data: {JSON.stringify(data)}</p>}
            {status === 'error' && <p>Error: {error}</p>}
        </div>
    );
};

export default TestComponent;
