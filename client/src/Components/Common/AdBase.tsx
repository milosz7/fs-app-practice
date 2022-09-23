import { useContext, useEffect, useState, useCallback } from 'react';
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
import censorPhoneNumber from '../../utils/censorPhoneNumber';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../../Context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const AdBase = ({
  image,
  title,
  seller,
  location,
  price,
  description,
  published,
  _id
}: {
  image: File | string;
  title: string;
  seller: { _id?: mongoose.Types.ObjectId; username: string; avatar: string; phone: string };
  location: string;
  price?: number;
  description: string;
  published: string;
  _id?: mongoose.Types.ObjectId;
}) => {
  const [displayedPhone, setDisplayedPhone] = useState('');
  const [displayPhoneData, setDisplayPhoneData] = useState(true);
  const [displayedImageURL, setDisplayedImageURL] = useState('');
  const { user } = useContext(AuthContext)!;
  
  const declareImageType = useCallback(() => {
    if (typeof image === 'string') {
      return setDisplayedImageURL(image);
    }
    setDisplayedImageURL(URL.createObjectURL(image));
  }, [image]);

  useEffect(() => {
    const phone = seller.phone;
    setDisplayedPhone(censorPhoneNumber(phone));
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
          style={{
            width: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
            height: '100%',
            maxHeight: 500,
          }}
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
              {user && seller._id === user.id && (
                <Box
                  sx={{ display: 'flex', alignSelf: 'center', ml: 'auto', flexDirection: 'column' }}
                >
                  <Button component={RouterLink} to={`/edit/${_id}`} variant="contained" size="small" startIcon={<EditIcon />}>
                    edit
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mt: 0.5 }}
                    size="small"
                    startIcon={<DeleteIcon />}
                    color="error"
                  >
                    delete
                  </Button>
                </Box>
              )}
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
            <Typography color="text.primary" fontWeight={700} variant="h4">{`${
              price ? price : 0
            } USD`}</Typography>
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
