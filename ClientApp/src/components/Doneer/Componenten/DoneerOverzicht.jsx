import { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import WithContext from '../../Componenten/ContextHelpers/WithContext';
import DoneerContextProvider, { DoneerContext } from '../DoneerContext';
import DonatieGoedDoelPagina from './Scenes/DonatieGoedDoelPagina';
import GoedeDoelenPagina from './Scenes/GoedeDoelenPagina';
import VerleenToegangPagina from './Scenes/VerleenToegangPagina';

function DoneerOverzicht() {
    const doneerContext = useContext(DoneerContext);
    const { userAccesToken } = doneerContext;

    const location = useLocation();
    const { goedDoelId } = useParams();


    useEffect(() => {

    }, [location.pathname]);

    if (userAccesToken === null) {
        return (<VerleenToegangPagina />)
    }
    
    if (goedDoelId) {
        return (<DonatieGoedDoelPagina goedDoelId={goedDoelId} />)
    }

    return (<GoedeDoelenPagina accesToken={userAccesToken} />);
}

export default WithContext(DoneerContextProvider, DoneerOverzicht);