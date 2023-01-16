import { Button, styled, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledShowItem = styled('div')(({ theme }) => ({
    display: 'flex',
    boxShadow: '1px 1px 1px grey',
    border: '1px solid grey',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    justifyContent: 'space-between',
}));

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
}));


export default function BeheerShowItem(props) {
    const { show } = props;
    const { startDateTime, endDateTime, voorstellingNaam, zaalType } = show;

    const navigate = useNavigate();

    const startTijdstip = new Date(startDateTime);
    const eindTijdstip = new Date(endDateTime);

    const smallScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));

    return (
        <StyledShowItem sx={{ flexDirection: smallScreen ? 'row' : 'column',  }}>
            <StyledDiv sx={{ mb: smallScreen ? 0 : 2}}>
                <Typography variant='h4' sx={{ mr: 2 }}>{voorstellingNaam}</Typography>
                <Typography sx={{ mr: 2 }}>Datum: {startTijdstip.toLocaleDateString()}</Typography>
                <Typography sx={{ mr: 2 }}>Tijd: {startTijdstip.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) + '-' + eindTijdstip.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</Typography>
                <Typography>Zaal: {zaalType}</Typography>
            </StyledDiv>
            <Button variant='contained' sx={{ height: 'fit-content'}} onClick={() => navigate(`/beheer/shows/${show.id}`)}>Naar kaarthoudersoverzicht</Button>
        </StyledShowItem>
    )
}