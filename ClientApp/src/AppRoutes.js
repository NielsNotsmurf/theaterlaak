import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Programmering } from "./components/Programmering";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact";

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
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
