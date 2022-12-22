import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Programmering } from "./components/Programmering";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact";
import { Kaarten } from "./components/Kaarten";

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
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
