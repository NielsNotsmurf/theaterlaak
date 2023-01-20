import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function ProfielOverzicht() {
    const navigate = useNavigate();

    return (
        <>
            <Button id='showReserveringen' onClick={() => navigate('/profiel/reserveringen')} >Mijn reserveringen</Button>
        </>
    )
}