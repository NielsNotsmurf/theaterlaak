import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MainContext } from '../../MainContext';
import DonatieGoedDoelPagina from './Scenes/DonatieGoedDoelPagina';
import GoedeDoelenPagina from './Scenes/GoedeDoelenPagina';
import VerleenToegangPagina from './Scenes/VerleenToegangPagina';
import applicationUserService from '../../Services/applicationUserService';
import SnackbarManager from '../../Componenten/Snackbar/SnackbarManager';

export default function DoneerOverzicht() {
    const mainContext = useContext(MainContext);
    const { user } = mainContext;

    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const { goedDoelId, token } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
    }, [location.pathname]);

    async function updateUserWhenCatchingToken() {
        setIsLoading(true);

        try {
            await applicationUserService.updateUserWithToken(token);
            navigate('/doneren');
        } catch (error) {
            console.log(error);
            SnackbarManager.showError(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (token) {
        updateUserWhenCatchingToken()
    }

    if (user.jwtDonatieToken === null) {
        return (<VerleenToegangPagina />)
    }
    
    if (goedDoelId) {
        return (<DonatieGoedDoelPagina goedDoelId={goedDoelId} />)
    }

    return (<GoedeDoelenPagina accessToken={user.jwtDonatieToken} />);
}