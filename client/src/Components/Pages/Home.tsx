import AdsList from '../Features/AdsList';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const Home = () => {
  const { state }: { state: { query: string | null } } = useLocation();
  const pageTitle = state && state.query ? `Showing results for: ${state.query}` : 'Avaliable ads';

  return (
    <Box pt={3}>
      <Typography mb={2} fontWeight={700} variant="h5">
        {pageTitle}
      </Typography>
      <AdsList />
    </Box>
  );
};

export default Home;
