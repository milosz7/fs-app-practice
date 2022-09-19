import Navigation from './Components/Views/Navigation/Navigation';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import AdsProvider from './Components/Features/AdsProvider';
import AuthProvider from './Components/Features/AuthProvider';
import ErrorsProvider from './Components/Features/ErrorsProvider';
import ErrorAlert from './Components/Views/ErrorAlert';

const App = () => {
  return (
    <ErrorsProvider>
      <AuthProvider>
        <AdsProvider>
          <ErrorAlert />
          <Navigation />
          <Container>
            <Outlet />
          </Container>
        </AdsProvider>
      </AuthProvider>
    </ErrorsProvider>
  );
};

export default App;
