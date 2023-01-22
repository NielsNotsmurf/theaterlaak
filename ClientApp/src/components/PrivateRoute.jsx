import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getLocalUser } from './Helpers/storageHelper';
import { MainContext } from './MainContext';
import jwtDecode from 'jwt-decode';
import applicationUserService from './Services/applicationUserService';


export default function PrivateRoute() {
    const [isLoading, setIsLoading] = useState(false);

    const { user, updateContextState } = useContext(MainContext);

    const navigate = useNavigate();

    useEffect(() => {
        intialize();
    }, []);

    async function intialize() {
        setIsLoading(true);

        try {
            if ('accessToken' in getLocalUser()) {
                const jwtToken = jwtDecode(getLocalUser().accessToken);
                if (new Date(jwtToken.exp * 1000) < new Date()) {
                    updateContextState({ user: undefined, roles: [] });

                    localStorage.clear();
                    navigate('/login');
                } else {
                    const loggedInUser = await applicationUserService.getUserById(getLocalUser().id);

                    updateContextState({ user: loggedInUser, roles: jwtToken.roles });
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return user ? <Outlet /> : <Navigate to={'/login'} />;
}