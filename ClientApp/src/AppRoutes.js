import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Programmering } from "./components/Programmering/Programmering";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact/Contact";
import { Kaarten } from "./components/Profiel/Kaarten";

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
    element: <Kaarten />
  },
  {
    path: '/login',
    requireAuth: true,
    element: <Kaarten />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
