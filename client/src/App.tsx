import Navigation from './Components/Views/Navigation/Navigation';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
