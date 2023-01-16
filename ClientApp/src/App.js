import './custom.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Kaarten } from './components/Profiel/Kaarten';
import { Layout } from './components/Layout';
import Contact from './components/Contact/Contact';
import Doneer  from './components/Doneer/Doneer';
import Home from './components/Home';
import Login from './components/Profiel/Login';
import MainContextProvider from './components/MainContext';
import Profiel from './components/Profiel/Profiel';
import Programmering from './components/Programmering/Programmering';
import React from 'react';
import Register from './components/Profiel/Register';
import WithContext from './components/Componenten/ContextHelpers/WithContext';
import Beheer from './components/Beheer/Beheer';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/programmering' element={<Programmering />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/kaarten' element={<Kaarten />} />
                    <Route path='/doneren/*' element={<Doneer />} />
                    <Route path='/registreren' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/profiel/*' element={<Profiel />} />
                    <Route path='/beheer/*' element={<Beheer />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default WithContext(MainContextProvider, App);