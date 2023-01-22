import { Button, List, ListItem, styled, Typography } from '@mui/material';
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import momentService from '../../Services/momentService';
import reserveringService from '../../Services/reserveringService';

const StyledDiv = styled('div')(({ theme }) => ({
    padding: theme.spacing(2)
}));

const StyledShowInfoDiv = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
}));

const KaartHoudersOverzicht = forwardRef((props, ref) => {
    const { show, kaartHoudersShow } = props;

    if (show == null) {
        return (<>Er is iets fout gegaan.</>)
    }

    const startTijdstip = new Date(show.startDateTime ?? '');
    const eindTijdstip = new Date(show.endDateTime ?? '');

    return (
        <StyledDiv ref={ref}>
            <StyledShowInfoDiv>
                <Typography variant='h2' sx={{ mr: 2}}>{show.voorstellingNaam}</Typography>
                <Typography sx={{ mr: 2 }}>Datum: {startTijdstip.toLocaleDateString()}</Typography>
                <Typography sx={{ mr: 2 }}>Tijd: {startTijdstip.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) + '-' + eindTijdstip.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</Typography>
                <Typography>Zaal: {show.zaalType}</Typography>
            </StyledShowInfoDiv>
            <List sx={{ alignItems: 'flex-start', p: 0}}>
                {kaartHoudersShow ? kaartHoudersShow.map((show, index) =>  
                    <ListItem key={index} sx={{ alignItems: 'flex-start', mb: 2, boxShadow: '1px 1px 1px grey', border: '1px solid grey' }}>
                        <Typography variant='h5' sx={{ mr: 4 }}>Gebruikers email: {show.userEmail}</Typography>
                        <Typography>Gereserveerde stoelen: </Typography>
                        <List sx={{ p: 0, ml: 2}}>
                            {(show.gereserveerdeStoelen.length > 0) ?
                                show.gereserveerdeStoelen.map((stoel, index) => 
                                    <ListItem key={index} sx={{ pt: 0}}>
                                        <Typography variant='body1' sx={{ mr: 2 }}>Rij: {stoel.rij}</Typography>
                                        <Typography variant='body1' sx={{ mr: 2 }}>Plaats: {stoel.zitPlaats}</Typography>
                                    </ListItem>
                            ) : (<>Geen gereserveerde stoelen</>)}
                        </List>
                    </ListItem> 
                ) : <>Er zijn nog geen reserveringen geplaatst voor deze show.</>}
            </List>
        </StyledDiv>
    )
});

const PrintbareKaartjesHoudersOverzicht = () => {
    const componentRef = useRef();

    const { showId } = useParams();

    const [show, setShow] = useState(null);
    const [showArray, setShowArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchKaartHouders() { 
            setIsLoading(true);

            try {
                const kaarthouders = await reserveringService.getKaartHoudersShow(showId, "68abc662-caac-420f-9930-d63ea96a5509");
                const showtje = await momentService.GetMomentById(showId);
                setShowArray(kaarthouders);
                setShow(showtje);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchKaartHouders();
    }, [showId]);

    if (isLoading) {
        return (<>Aan het laden...</>)
    }

    return (
        <div>
            <KaartHoudersOverzicht ref={componentRef} show={show} kaartHoudersShow={showArray} />
            <ReactToPrint 
                trigger={() => <Button variant='contained'>Uitprinten</Button>}
                content={() => componentRef.current}
            />
        </div>
    )
}

export default PrintbareKaartjesHoudersOverzicht;