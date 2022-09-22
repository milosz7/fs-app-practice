import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import LoadingContext from '../../Context/LoadingContext';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import usePersistLogin from '../../Hooks/usePersistLogin';
import AuthContext from '../../Context/AuthContext';

const DisplayContent = () => {
  const { loading } = useContext(LoadingContext)!;
  const { setUser, user } = useContext(AuthContext)!;

  const isLogged = usePersistLogin();
  useEffect(() => {
    if (!user) {
      const fetchSessionData = async () => {
        setUser(await isLogged());
      };
      fetchSessionData();
    }
  }, [user, isLogged, setUser]);

  return (
    <>
      <LinearProgress sx={{ visibility: loading ? 'visible' : 'hidden' }} color="secondary" />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default DisplayContent;
