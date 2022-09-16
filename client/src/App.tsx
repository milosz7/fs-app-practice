import Navigation from './Components/Views/Navigation/Navigation';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import AdsProvider from './Components/Features/AdsProvider';
import AuthProvider from './Components/Features/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <AdsProvider>
        <Navigation />
        <Container>
          <Outlet />
        </Container>
      </AdsProvider>
    </AuthProvider>
  );
};

export default App;
