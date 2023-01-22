import React, { useState, useEffect } from 'react';

export default function DataOverzicht() 
{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => 
    {
        fetch('api/Beheer/DataOverzicht?_limit=8')
            .then((response => {
                if (!response.ok) {
                    throw new Error('Er is iets misgegaan');
                }
                return response.json();
            }))
            .then((actualData) => {
                console.log(actualData);
                setError(null);
            })
            .catch((error) => {
                // console.log(error);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Overzicht</h1>
            <p>Overzicht van alle data</p>
            {loading && <p>Bezig met laden...</p>}
            {error && <p>{error}</p>}
            <ul>
                {data && data.map((item) => (
                    <li key={item.id}>{item.naam}</li>
                ))}
            </ul>
        </div>
    )
}