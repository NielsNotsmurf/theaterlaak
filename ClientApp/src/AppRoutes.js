import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Programmering } from "./components/Programmering/Programmering";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact/Contact";
import { Kaarten } from "./components/Profiel/Kaarten";
import { Login } from "./components/Profiel/Login";
import { Register } from "./components/Profiel/Register";

const AppRoutes = [
  {
    index: true,
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
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
