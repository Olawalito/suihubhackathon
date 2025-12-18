import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../components/dashboard/Dashboard';
import Mycircle from '../pages/Mycircle';

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
  }
]);
