import './custom.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Kaarten } from './components/Profiel/Kaarten';
import { Layout } from './components/Layout';
import Contact from './components/Contact/Contact';
import Doneer  from './components/Doneer/Doneer';
import Home from './components/Home';
import Programmering from './components/Programmering/Programmering';
import React, {useState} from 'react';
import Register from './components/Profiel/Register';
import Login from './components/Profiel/Login';

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
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;