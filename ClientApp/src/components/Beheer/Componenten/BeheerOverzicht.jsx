import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function BeheerOverzicht() {
    const navigate = useNavigate();
    
    return (
        <>
            <Button onClick={() => navigate('/beheer/shows')}>Shows</Button>
        </>
    )
}