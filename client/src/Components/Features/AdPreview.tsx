import { useEffect, useState, useRef } from 'react';
import AdBase from '../Common/AdBase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useFetchUserData from '../../Hooks/useFetchUserData';
import AdContactContainer from '../Common/AdDisplay/AdContactContainer';
import AdUserDataContainer from '../Common/AdDisplay/AdUserDataContainer';
import AdDescriptionContainer from '../Common/AdDisplay/AdDescriptionContainer';
import AdImageContainer from '../Common/AdDisplay/AdImageContainer';
import AdInfoContainer from '../Common/AdDisplay/AdInfoContainer';

const AdPreview = ({
  previewData,
  image,
}: {
  previewData: {
    title: string;
    location: string;
    description: string;
    price: number;
  };
  image: File | string;
}) => {
  const [userData, setUserData] = useState<{
    username: string;
    avatar: string;
    phone: string;
  } | null>(null);
  const previewPublishedDate = useRef<string>(new Date().toISOString());
  const fetchUserData = useFetchUserData();

  useEffect(() => {
    const dispatchFetchUser = async () => {
      setUserData(await fetchUserData());
    };
    dispatchFetchUser();
  }, [fetchUserData]);

  if (!userData) return null;

  const { title, location, description, price } = previewData;

  return (
    <Box mt={3}>
      <Typography mb={2} fontWeight={700} variant="h5">
        Ad preview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} borderRadius={3}>
          <AdImageContainer pathOrFile={image} altText={title} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box height="100%" display="flex" flexDirection="column">
            <AdUserDataContainer
              username={userData.username}
              avatar={userData.avatar}
            />
            <AdInfoContainer
              title={title}
              location={location}
              price={price}
              published={previewPublishedDate.current}
            />
            <AdContactContainer phone={userData.phone} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AdDescriptionContainer description={description} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdPreview;
