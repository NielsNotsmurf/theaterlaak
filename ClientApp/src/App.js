import './custom.css';
import { Route, Routes } from 'react-router-dom';
import { Kaarten } from './components/Profiel/Kaarten';
import { Layout } from './components/Layout';
import { AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Contact from './components/Contact/Contact';
import Doneer  from './components/Doneer/Doneer';
import Home from './components/Home';
import Login from './components/Profiel/Login';
import MainContextProvider, { MainContext } from './components/MainContext';
import Profiel from './components/Profiel/Profiel';
import Programmering from './components/Programmering/Programmering';
import React, { useContext } from 'react';
import Register from './components/Profiel/Register';
import WithContext from './components/Componenten/ContextHelpers/WithContext';
import Beheer from './components/Beheer/Beheer';
import { useNavigate } from 'react-router-dom';
import SnackbarSingleton from './components/Componenten/Snackbar/SnackbarSingleton';

function App() {
    const { updateContextState } = useContext(MainContext);
    const navigate = useNavigate();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SnackbarSingleton />
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/programmering' element={<Programmering />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/kaarten' element={<Kaarten />} />
                    <Route path='/doneren/*' element={<Doneer />} />
                    <Route path='/registreren' element={<Register navigate={navigate} />} />
                    <Route path='/login' element={<Login navigate={navigate} updateContextState={updateContextState} />} />
                    <Route path='/profiel/*' element={<Profiel />} />
                    <Route path='/beheer/*' element={<Beheer />} />
                </Routes>
            </Layout>
        </LocalizationProvider>
    );
}

export default WithContext(MainContextProvider, App);