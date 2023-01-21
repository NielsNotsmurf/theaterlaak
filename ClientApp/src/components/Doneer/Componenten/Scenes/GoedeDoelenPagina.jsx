import { Box, Grid, styled, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import donatieService from '../../../Services/donatieService';
import GoedDoelComponent from './GoedDoelComponent';

const StyledDiv = styled('div')(() => ({
    textAlign: 'center',
}));

export default function GoedeDoelenPagina(props) {
    const { accessToken } = props;

    const [donaties, setDonaties] = useState(0);
    const [goedeDoelen, setGoedeDoelen] = useState([]);

    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

    useState(async () => {
        const bedrag = await donatieService.countDonatieTotaal(accessToken);
        const doelen = await donatieService.getGoedeDoelen(accessToken);
        setGoedeDoelen(doelen);
        setDonaties(bedrag);
    }, [])

    function screenSize() {
        if (!isSmallScreen) {
            return 12;
        } else if (!isMediumScreen) {
            return 6;
        } else {
            return 4;
        }
    }

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
                            xs={screenSize()} 
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