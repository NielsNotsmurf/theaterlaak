import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


export default function ProfielOverzicht() {
    const navigate = useNavigate();

    return (
        <>
            <Button onClick={() => navigate('/profiel/reserveringen')} >Mijn reserveringen</Button>
        </>
    )
}