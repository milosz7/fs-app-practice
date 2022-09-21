import { useContext, useEffect, useState, useCallback } from 'react';
import { AdData } from '../../Context/AdsContext';
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
import mongoose from 'mongoose';

const AdBase = ({
  image,
  title,
  seller,
  location,
  price,
  description,
  published,
}: {
  image: File | string;
  title: string;
  seller: {_id?: mongoose.Types.ObjectId; username: string; avatar: string; phone: string};
  location: string;
  price: number;
  description: string;
  published: string;
  _id?: mongoose.Types.ObjectId;
}) => {
  const [displayedPhone, setDisplayedPhone] = useState('');
  const [displayPhoneData, setDisplayPhoneData] = useState(true);
  const [displayedImageURL, setDisplayedImageURL] = useState('')

  const declareImageType = useCallback(() => {
    if (typeof image === 'string') {
      return setDisplayedImageURL(image)
    }
    setDisplayedImageURL(URL.createObjectURL(image))
  }, [image])
  
  useEffect(() => {
    const phone = seller.phone;
    const hiddenNumberRemainder = 'xxxxxx';
    const numberWithoutLastSixDigits = phone.slice(0, phone.length - 6);
    setDisplayedPhone(numberWithoutLastSixDigits + hiddenNumberRemainder);
    declareImageType();
  }, [seller, declareImageType]);

  const animateTransition = () => {
    setDisplayPhoneData(false);
    setTimeout(() => {
      setDisplayedPhone(seller.phone);
    }, dataUpdateDelayInMs);
    setTimeout(() => {
      setDisplayPhoneData(true);
    }, transitionFinishDelayInMs);
  };

  const timeSincePublished = Date.now() - Date.parse(published);
  const publishedDate = new Date(published).toLocaleString();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7} borderRadius={3}>
        <img
          src={displayedImageURL}
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
            <Zoom in={displayPhoneData}>
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

export default AdBase;