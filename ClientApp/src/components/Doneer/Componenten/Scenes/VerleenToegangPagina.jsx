import { Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column'
}));

const StyledGiveAccesDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    alignItems: 'center',
    boxShadow: '2px 2px 2px grey',
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
}));


export default function VerleenToegangPagina() {
    return (
        <StyledDiv>
            <Typography variant='h2'>Geef toegang aan ons theater!</Typography>
            <Typography variant='h4'>Voordat je via onze applicatie kan doneren moet je ons eerst toegang geven tot je donatie account.</Typography>
            <StyledGiveAccesDiv>
                <Typography variant='h5' sx={{ mb: 2}}>Door op onderstaande knop te drukken wordt je naar de pagina gestuurd waar je ons toegang kunt geven tot je doneeraccount.</Typography>
                <Button variant='contained' sx={{ width: '50%'}} onClick={() => window.location.replace('https://ikdoneer.azurewebsites.net/Toegang?url=https%3A%2F%2Flocalhost:44492/doneren/toegang/')}>Geef toegang</Button>
            </StyledGiveAccesDiv>
        </StyledDiv>
    )
}