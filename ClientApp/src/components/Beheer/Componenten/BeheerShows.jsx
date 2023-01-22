import { IconButton, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import momentService from '../../Services/momentService';
import BeheerShowItem from './BeheerShowItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const StyledShowList = styled('div')(({ theme }) => ({

}));

const InlineDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

export default function BeheerShows() {    
    const [shows, setShows] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchShows();
    }, [])

    async function fetchShows() {
        setIsLoading(true);

        try {
            const fetchedShows = await momentService.GetMomenten();
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
            <InlineDiv>
                <IconButton onClick={() => navigate('/beheer')}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h2'>Aankomende shows</Typography>
            </InlineDiv>
            {(shows && shows.length > 0) ? shows.map((show, index) => <BeheerShowItem key={index} show={show}/>) : <>Geen resultaten</>}
        </StyledShowList>
    )
}