import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import AdsContext from '../../Context/AdsContext';
import AdCard from '../Views/AdCard';
import NotFoundError from '../Views/NotFoundError';
import LoadingContext from '../../Context/LoadingContext';

const AdsList = () => {
  const { ads } = useContext(AdsContext)!;
  const { loading } = useContext(LoadingContext)!;

  if (loading) return null

  if (!ads.length) {
    return (
      <NotFoundError
        title="Something went wrong!"
        message="We could not find any ads mathcing your criteria."
      />
    );
  }

  return (
    <Grid container spacing={2}>
      {ads.map(({ _id, image, title, location }) => (
        <Grid item key={_id.toString()} xs={12} sm={6} md={4} xl={3}>
          <AdCard id={_id} image={image} title={title} location={location}></AdCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default AdsList;
