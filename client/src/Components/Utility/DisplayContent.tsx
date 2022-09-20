import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import LoadingContext from '../../Context/LoadingContext';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';

const DisplayContent = () => {
  const { loading } = useContext(LoadingContext)!;

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
