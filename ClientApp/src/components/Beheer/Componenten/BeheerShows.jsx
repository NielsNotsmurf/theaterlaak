import { styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import BeheerService from '../BeheerService';
import BeheerShowItem from './BeheerShowItem';

const StyledShowList = styled('div')(({ theme }) => ({

}));

export default function BeheerShows() {    
    const [shows, setShows] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchShows();
    }, [])

    async function fetchShows() {
        setIsLoading(true);

        try {
            const fetchedShows = await BeheerService.getMomenten();
            setShows(fetchedShows);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (<>Aan het laden...</>)
    }

    return (
        <StyledShowList>
            <Typography variant='h2' sx={{ mb: 2 }}>Aankomende shows</Typography>
            {(shows && shows.length > 0) ? shows.map((show, index) => <BeheerShowItem key={index} show={show} />) : <>Geen resultaten</>}
        </StyledShowList>
    )
}