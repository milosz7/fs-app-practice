import { useContext } from 'react';
import AdsContext from '../../Context/AdsContext';
import { useParams } from 'react-router-dom';
import NotFoundError from './NotFoundError';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AdImageContainer from '../Common/AdDisplay/AdImageContainer';
import AdUserDataContainer from '../Common/AdDisplay/AdUserDataContainer';
import AdContactContainer from '../Common/AdDisplay/AdContactContainer';
import AdInfoContainer from '../Common/AdDisplay/AdInfoContainer';
import AdDescriptionContainer from '../Common/AdDisplay/AdDescriptionContainer';

const AdExpanded = () => {
  const { id } = useParams();
  const { ads } = useContext(AdsContext)!;
  const adData = ads.find(({ _id }) => id === _id.toString());

  if (!adData)
    return (
      <NotFoundError
        title="Something went wrong!"
        message={`Ad data for id: ${id} was not found.`}
      />
    );

  const { title, price, _id, location, description, seller, published, image } = adData;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7} borderRadius={3}>
        <AdImageContainer path={image} altText={title} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Box height="100%" display="flex" flexDirection="column">
          <AdUserDataContainer
            username={seller.username}
            avatar={seller.avatar}
            existingAdData={{ adId: _id, sellerId: seller._id }}
          />
          <AdInfoContainer title={title} location={location} price={price} published={published} />
          <AdContactContainer phone={seller.phone} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <AdDescriptionContainer description={description} />
      </Grid>
    </Grid>
  );
};

export default AdExpanded;
