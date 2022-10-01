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
import ProtectedRoute from './Components/Utility/ProtectedRoute';
import RouteForUnauthorized from './Components/Utility/RouteForUnatuhorized';
import AdDataProvider from './Components/Providers/LocalAdDataProvider';
import Profile from './Components/Pages/Profile';
import App from './App';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="login"
        element={
          <RouteForUnauthorized>
            <Login />
          </RouteForUnauthorized>
        }
      />
      <Route
        path="edit/:id"
        element={
          <ProtectedRoute>
            <AdDataProvider>
              <Edit />
            </AdDataProvider>
          </ProtectedRoute>
        }
      />
      <Route path="ads/:id" element={<Ad />} />
      <Route
        path="add"
        element={
          <ProtectedRoute>
            <AdDataProvider>
              <Add />
            </AdDataProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="register"
        element={
          <RouteForUnauthorized>
            <Register />
          </RouteForUnauthorized>
        }
      />
      <Route path="profile/:name" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
