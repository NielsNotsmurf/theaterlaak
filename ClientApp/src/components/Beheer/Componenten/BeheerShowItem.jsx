import { Button, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledShowItem = styled('div')(({ theme }) => ({
    display: 'flex',
    boxShadow: '1px 1px 1px grey',
    border: '1px solid grey',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    justifyContent: 'space-between',
}));

const StyledDiv = styled('div')(({ theme, smallScreen }) => ({
    display: 'flex',
    flexDirection: smallScreen ? 'row' : 'column',
    alignItems: 'center',
}));


export default function BeheerShowItem(props) {
    const { show } = props;
    const { startDateTime, endDateTime, voorstellingNaam, zaalType } = show;

    const navigate = useNavigate();
    const theme = useTheme();

    const startTijdstip = new Date(startDateTime);
    const eindTijdstip = new Date(endDateTime);

    const smallScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));

    return (
        <StyledShowItem sx={{ flexDirection: smallScreen ? 'row' : 'column', mb: 2 }}>
            <StyledDiv smallScreen={smallScreen} sx={{ mb: smallScreen ? 0 : 2}}>
                <Typography variant='h4' sx={{ mr: 2 }}>{voorstellingNaam}</Typography>
                <Typography sx={{ mr: 2 }}>Datum: {startTijdstip.toLocaleDateString()}</Typography>
                <Typography sx={{ mr: 2 }}>Tijd: {startTijdstip.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) + '-' + eindTijdstip.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</Typography>
                <Typography>Zaal: {zaalType}</Typography>
            </StyledDiv>
            <StyledDiv smallScreen={smallScreen}>
                <Button variant='contained' fullWidth={!smallScreen} sx={{ height: 'fit-content', padding: theme.spacing(2), mr: smallScreen ? 1 : 0, mb: !smallScreen ? 1 : 0  }} onClick={() => navigate(`/beheer/shows/${show.id}`)}>Naar kaarthoudersoverzicht</Button>
                {/* <Button variant='contained' color='error' fullWidth={!smallScreen} sx={{ height: 'fit-content', padding: theme.spacing(2)}} onClick={() => navigate(`/beheer/shows/${show.id}`)}>Verwijderen</Button> */}
            </StyledDiv>
        </StyledShowItem>
    )
}