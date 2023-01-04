import { styled, Typography } from '@mui/material';

const StyledDiv = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
}));

export default function DoneerOverzicht() {
    return (
        <StyledDiv>
            <Typography variant='h1'>Wil je vervroegd inzicht krijgen in shows?</Typography>
            <Typography variant='h2'>Op het moment dat je 100 euro gedoneerd hebt zijn er vele voordelen!</Typography>
        </StyledDiv>
    );
}