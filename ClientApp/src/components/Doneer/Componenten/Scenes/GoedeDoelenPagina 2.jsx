import { Box, Grid, styled, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoneerHelper from '../../DoneerHelper';
import GoedDoelComponent from './GoedDoelComponent';

const StyledDiv = styled('div')(() => ({
    textAlign: 'center',
}));

export default function GoedeDoelenPagina(props) {
    const { accesToken } = props;

    const [donaties, setDonaties] = useState(0);
    const [goedeDoelen, setGoedeDoelen] = useState([]);

    const navigate = useNavigate();

    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));

    useState(async () => {
        const bedrag = await DoneerHelper.countDonatieTotaal(accesToken);
        const doelen = await DoneerHelper.getGoedeDoelen(accesToken);
        setGoedeDoelen(doelen);
        setDonaties(bedrag);
    }, [])

    return (
        <StyledDiv>
            <Typography variant='h1'>Doneer aan een goed doel!</Typography>
            {donaties >= 100 ? 
                (<Typography variant='h4'>Bedankt dat je al {donaties} euro aan goede doelen hebt uitgegeven, hierdoor heb je voordelen voor ons theater.</Typography>)
                : (<Typography variant='h4'>Op dit moment heb je {donaties} uitgegeven aan een goed doel, bij een bijdrage van 100 euro aan goede doelen krijg je voordelen voor ons theater.</Typography>)
            }
            <Typography variant='body1' sx={{ mt: 4}}>Klik op een goed doel om dit doel te selecteren!</Typography>
            <Box sx={{ padding: theme => theme.spacing(2), flexGrow: 1, marginTop: theme => theme.spacing(1) }}>
                <Grid container spacing={4}>
                    {goedeDoelen ? goedeDoelen.map((doel, index) => 
                        <Grid
                            key={index} 
                            item 
                            onClick={() => navigate(`/doneren/${doel.id}`)}
                            xs={isLargeScreen ? 4 : 12} 
                            sx={{ display: 'flex', width: '100%'}}
                        >
                            <GoedDoelComponent doel={doel} />
                        </Grid>
                    ): <>Er is iets fout gegaan!</>}
                </Grid>
            </Box>
        </StyledDiv>
    );
}