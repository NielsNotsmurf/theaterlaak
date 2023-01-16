import { Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledDiv = styled('div')(({ theme }) => ({

}));

export default function BeheerOverzicht() {
    const navigate = useNavigate();
    
    return (
        <StyledDiv>
            <Button variant='contained' sx={{ mr: 2 }} onClick={() => navigate('/beheer/shows')}>Shows</Button>
            <Button variant='contained' onClick={() => navigate('/beheer/show-toevoegen')}>Show toevoegen</Button>
        </StyledDiv>
    )
}