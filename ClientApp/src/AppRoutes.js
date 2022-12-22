import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Programmering } from "./components/Programmering";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact";
import { Kaarten } from "./components/Kaarten";
import { Afrekenen } from "./components/Afrekenen";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/Program',
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
  // tijdelijk
  {
    path: '/afrekenen',
    requireAuth: false,
    element: <Afrekenen />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
