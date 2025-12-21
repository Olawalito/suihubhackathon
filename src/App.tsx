import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <React.StrictMode>
        <ToastContainer />
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
