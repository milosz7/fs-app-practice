import { useContext, useEffect, useState } from 'react';
import AdsContext from '../../Context/AdsContext';
import { useParams } from 'react-router-dom';
import declareImgPath from '../../utils/declareImgPath';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { msToPublishedInfo } from '../../utils/msToPublishedInfo';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import { dataUpdateDelayInMs, transitionFinishDelayInMs } from '../../constants';

const AdExpanded = () => {
  const { id } = useParams();
  const { ads } = useContext(AdsContext)!;
  const adData = ads.find(({ _id }) => id === _id.toString());
  const [displayedPhone, setDisplayedPhone] = useState('');
  const [displayElement, setDisplayElement] = useState(true);

  useEffect(() => {
    if (adData) {
      const phone = adData.seller.phone;
      const hiddenNumberRemainder = 'xxxxxx';
      const numberWithoutLastSixDigits = phone.slice(0, phone.length - 6);
      setDisplayedPhone(numberWithoutLastSixDigits + hiddenNumberRemainder);
    }
  }, [adData]);

  if (!adData) return <h1>Data not found.</h1>; // to improve

  const { title, description, published, image, price, location, seller } = adData;

  const animateTransition = () => {
    setDisplayElement(false);
    setTimeout(() => {
      setDisplayedPhone(seller.phone);
    }, dataUpdateDelayInMs);
    setTimeout(() => {
      setDisplayElement(true);
    }, transitionFinishDelayInMs);
  };

  const timeSincePublished = Date.now() - Date.parse(published);
  const publishedDate = new Date(published).toLocaleString();

  return (
    <Grid pt={5} container spacing={3}>
      <Grid item xs={12} md={7} borderRadius={3}>
        <img
          src={declareImgPath(image)}
          alt={title}
          style={{ width: '100%', objectFit: 'contain', borderRadius: 'inherit' }}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Box height="100%" display="flex" flexDirection="column">
          <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
            <Box gap={3} display="flex">
              <img
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '100%' }}
                src={declareImgPath(seller.avatar)}
                alt="seller avatar"
              />
              <Typography sx={{ alignSelf: 'center' }} variant="h6">
                {seller.username}
              </Typography>
            </Box>
          </Paper>
          <Paper
            sx={{ p: 3, mb: 3, height: '100%', display: 'flex', flexDirection: 'column' }}
            elevation={3}
          >
            <Typography variant="h5" mb={0.5}>
              {title}
            </Typography>
            <Box mb={2} color="action.active" display="flex" alignItems="center">
              <Typography variant="body1">{location}</Typography>
              <LocationOnIcon />
            </Box>
            <Typography
              color="text.primary"
              fontWeight={700}
              variant="h4"
            >{`${price} USD`}</Typography>
            <Typography
              mt="auto"
              color="action.active"
              variant="body2"
            >{`Published ${msToPublishedInfo(timeSincePublished)} - ${publishedDate}.`}</Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5">Interested? Contact the seller!</Typography>
            <Zoom in={displayElement}>
              <Typography sx={{ py: 1 }} variant="body1" color="action.active">
                Phone number: {displayedPhone}
              </Typography>
            </Zoom>
            <Button
              onClick={() => animateTransition()}
              sx={{ mt: 1 }}
              size="small"
              color="success"
              variant="contained"
            >
              contact informations
            </Button>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
          <Typography sx={{ mb: 2 }} variant="h5">
            About the product:
          </Typography>
          <Typography variant="body1" lineHeight={1.5} sx={{ overflowWrap: 'break-word' }}>
            {description}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdExpanded;
