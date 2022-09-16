import Navigation from './Components/Views/Navigation/Navigation';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import AdsProvider from './Components/Features/AdsProvider';

const App = () => {

  return (
    <AdsProvider>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </AdsProvider>
  );
};

export default App;
