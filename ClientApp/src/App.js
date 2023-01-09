import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import './custom.css';

//routes
import { Programmering } from "./components/Programmering/Programmering";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact/Contact";
import { Kaarten } from "./components/Profiel/Kaarten";
import { Login } from "./components/Profiel/Login";
import { Register } from "./components/Profiel/Register";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return <Route key={index} {...rest} element={requireAuth} />;
          })}
        </Routes>
      </Layout>
    );
  }
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
    element: <Register />
  },
  {
    path: '/login',
    requireAuth: true,
    element: <Login />
  },
];