import './custom.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Kaarten } from './components/Profiel/Kaarten';
import { Layout } from './components/Layout';
import Contact from './components/Contact/Contact';
import Doneer  from './components/Doneer/Doneer';
import Home from './components/Home';
import Programmering from './components/Programmering/Programmering';
import React from 'react';

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
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/',
    requireAuth: false,
    element: <Home />
  },
  {
    path: '/Programmering',
    requireAuth: false,
    element: <Programmering />
  },
  {
    path: '/Contact',
    requireAuth: false,
    element: <Contact />
  },
  {
    path: '/kaarten',
    requireAuth: true,
    element: <Kaarten />
  },
  {
    path: '/register',
    requireAuth: true,
    // element: <Register />
  },
  {
    path: '/login',
    requireAuth: true,
    // element: <Login />
  },
];


export default App;