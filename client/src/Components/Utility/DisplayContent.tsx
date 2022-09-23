import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import LoadingContext from '../../Context/LoadingContext';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import usePersistLogin from '../../Hooks/usePersistLogin';
import AuthContext from '../../Context/AuthContext';
import ActionDialog from '../Views/ActionDialog';

const DisplayContent = () => {
  const { loading } = useContext(LoadingContext)!;
  const { setUser, user } = useContext(AuthContext)!;

  const isLogged = usePersistLogin();
  useEffect(() => {
    const fetchSession = async () => {
      if (!user) {
        const userData = await isLogged();
        if (userData) {
          setUser(userData)
        }
      }
    }
    fetchSession();
  }, [isLogged, setUser, user]);

  return (
    <>
      <LinearProgress sx={{ visibility: loading ? 'visible' : 'hidden' }} color="secondary" />
      <Container>
        <ActionDialog />
        <Outlet />
      </Container>
    </>
  );
};

export default DisplayContent;
