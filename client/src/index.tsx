import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';
import Edit from './Components/Pages/Edit';
import Ad from './Components/Pages/Ad';
import Add from './Components/Pages/Add';
import Register from './Components/Pages/Register';
import NotFound from './Components/Pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="edit/:id" element={<Edit />} />
      <Route path="ad/:id" element={<Ad />} />
      <Route path="add" element={<Add />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
