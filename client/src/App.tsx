import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/Login/Login';
import Edit from './Components/Pages/Edit/Edit';
import Ad from './Components/Pages/Ad/Ad';
import Add from './Components/Pages/Add/Add';
import Register from './Components/Pages/Register/Register';
import NotFound from './Components/Pages/NotFound/NotFound';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/ad/:id" element={<Ad />} />
        <Route path="/add" element={<Add />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
