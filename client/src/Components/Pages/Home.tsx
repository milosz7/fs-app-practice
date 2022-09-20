import AdsList from '../Features/AdsList';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import AdsContext from '../../Context/AdsContext';
import LoadingContext from '../../Context/LoadingContext';

const Home = () => {
  const { state }: { state: { query: string | null } } = useLocation();
  const pageTitle = state && state.query ? `Showing results for: ${state.query}` : 'Avaliable ads';
  const { ads } = useContext(AdsContext)!;
  const { loading } = useContext(LoadingContext)!;

  return (
    <Box pt={3}>
      {(ads.length !== 0 && !loading) && (
        <Typography ml={2} mb={2} fontWeight={700} variant="h5">
          {pageTitle}
        </Typography>
      )}
      <AdsList />
    </Box>
  );
};

export default Home;
