import { styled, Typography } from '@mui/material';
import { useEffect } from 'react';
import DoneerHelper from '../DoneerHelper';

const StyledDiv = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
}));

export default function DoneerOverzicht() {
    useEffect(() => {
        async function getGedoneerdGeld() {
            await DoneerHelper.countDonatieTotaal();
        }

        console.log(getGedoneerdGeld());
        
    }, []);

    return (
        <StyledDiv>
            <Typography variant='h1'>Wil je vervroegd inzicht krijgen in shows?</Typography>
            <Typography variant='h2'>Op het moment dat je 100 euro gedoneerd hebt zijn er vele voordelen!</Typography>
        </StyledDiv>
    );
}