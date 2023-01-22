import './custom.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Contact from './components/Contact/Contact';
import Doneer from './components/Doneer/Doneer';
import Home from './components/Home';
import Login from './components/Profiel/Login';
import MainContextProvider, { MainContext } from './components/MainContext';
import Profiel from './components/Profiel/Profiel';
import Programmering from './components/Programmering/Programmering';
import Register from './components/Profiel/Register';
import SnackbarSingleton from './components/Componenten/Snackbar/SnackbarSingleton';
import WithContext from './components/Componenten/ContextHelpers/WithContext';
import Beheer from './components/Beheer/Beheer';
import { useNavigate } from 'react-router-dom';
import React, { Component, useEffect, useState, useContext } from 'react';
import AppRoutes from './AppRoutes';
import './custom.css';
import { getLocalUser } from './components/Helpers/storageHelper';
import PrivateRoute from './components/PrivateRoute';
import Uitloggen from './components/Profiel/Uitloggen';


function App() {
    const { updateContextState } = useContext(MainContext);
    const navigate = useNavigate();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SnackbarSingleton />
            <Layout>
                <Routes>
                    <Route path='/' element={<PrivateRoute />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/programmering' element={<Programmering />} />
                        <Route path='/contact' element={<Contact />} />
                        {/* <Route path='/kaarten' element={<Kaarten />} /> */}
                        <Route path='/doneren/*' element={<Doneer />} />
                        <Route path='/profiel/*' element={<Profiel />} />
                        <Route path='/beheer/*' element={<Beheer />} />
                        <Route path='/logout' element={<Uitloggen />} />
                    </Route>

                    <Route path='/registreren' element={<Register navigate={navigate} />} />
                    <Route path='/login' element={<Login navigate={navigate} updateContextState={updateContextState} />} />
                </Routes>
            </Layout>
        </LocalizationProvider>
    );
}

export default WithContext(MainContextProvider, App);