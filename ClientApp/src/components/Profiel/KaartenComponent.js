import '../styles/master.css';
import styled from '@mui/material/styles/styled';
import { Typography } from '@mui/material';

const StyledDiv = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    border: '1px solid #000814',
    borderRadius: '15px',
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.2)',
    padding: '10px',
    marginBottom: '10px'
})); 

export default function KaartenComponent(props)
{
    const {kaart} = props;
        return (
            <StyledDiv>
                <h5><i>Voorstelling:</i></h5>
                <Typography variant='p' sx={{ fontSize: '12pt'}}>{kaart.voorstelling}</Typography>
                <h5><i>Stoel:</i></h5>
                <Typography variant='p' sx={{ fontSize: '12pt'}}>{kaart.Stoel}{kaart.Rang}</Typography>
                <h5><i>Zaal:</i></h5>
                <Typography variant='p' sx={{ fontSize: '12pt'}}>{kaart.Zaal}</Typography>
            </StyledDiv>
        );
}