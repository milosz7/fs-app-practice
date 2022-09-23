import { useEffect, useState, useContext, useRef } from 'react';
import AlertsContext from '../../Context/AlertsContext';
import AdBase from '../Common/AdBase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useFetchUserData from '../../Hooks/useFetchUserData';

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
  const { setDisplayedMessage, setMessageDisplay } = useContext(AlertsContext)!;
  const previewPublishedDate = useRef<string>();
  const fetchUserData = useFetchUserData()

  useEffect(() => {
    const dispatchFetchUser = async () => {
      setUserData(await fetchUserData())
    };
    dispatchFetchUser();
    previewPublishedDate.current = new Date().toISOString();
  }, [setMessageDisplay, setDisplayedMessage, fetchUserData]);

  if (!userData) return null;

  return (
    <Box mt={3}>
      <Typography mb={2} fontWeight={700} variant="h5">
        Ad preview
      </Typography>
      <AdBase
        published={previewPublishedDate.current!}
        {...previewData}
        image={image}
        seller={userData}
      />
    </Box>
  );
};

export default AdPreview;
