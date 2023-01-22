import Home from './components/Home';
import Programmering from './components/Programmering/Programmering';
import Contact from './components/Contact/Contact';
import Doneer from './components/Doneer/Doneer';
import Register from './components/Profiel/Register';
import Login from './components/Profiel/Login';
import Profiel from './components/Profiel/Profiel';
import Beheer from './components/Beheer/Beheer';

const AppRoutes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/programmering',
    element: <Programmering />
  }
  ,
  {
    path: '/contact',
    element: <Contact />
  }
  ,
  {
    path: '/doneren/*',
    element: <Doneer />
  }
  ,
  {
    path: '/profiel/*',
    element: <Profiel />,
    authRequired: true
  }
  ,
  {
    path: '/beheer/*',
    element: <Beheer />,
    AdminRequired: true
  }
  ,
  {
    path: '/login',
    element: <Login />
  }
  ,
  {
    path: '/registreren',
    element: <Register />
  },
  {
    path: '*',
    element: <Home />
  }
];

export default AppRoutes;
