import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import HomePage from './pages';
import LoginPage from './pages/login';

const routerArray = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
];

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {routerArray.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Route>,
  ),
);

export default mainRouter;
