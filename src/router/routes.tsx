import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../components/dashboard/Dashboard';
import Mycircle from '../pages/Mycircle';

import ActivityPage from '../pages/ActivityPage';
import Circleactivity from '../pages/Circleactivity';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/mycircle',
    element: <Mycircle />,
  },
  {
    path: '/activity',
    element: <ActivityPage />,
  },
  {
    path: '/circle/:circleId',
    element: <Circleactivity />,
  }
]);
