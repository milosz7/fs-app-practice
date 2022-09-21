import { useEffect, useState, useContext } from 'react';
import declareImgPath from '../../utils/declareImgPath';
import fetchUserData from '../../utils/fetchUserData';
import ErrorsContext from '../../Context/ErrorsContext';
import AdBase from '../Common/AdBase';
import { msToPublishedInfo } from '../../utils/msToPublishedInfo';
import { defaultAdImagePath } from '../../constants';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
  image?: File;
}) => {
  const [userData, setUserData] = useState<{
    username: string;
    avatar: string;
    phone: string;
  } | null>(null);
  const { setErrorMessage, setDisplayError } = useContext(ErrorsContext)!;
  const previewPublishedDate = Date.parse(new Date().toISOString());

  useEffect(() => {
    const fetch = async () => {
      try {
        const { output, status } = await fetchUserData();
        if (status === 200) {
          return setUserData(output as { username: string; avatar: string; phone: string });
        }
        const { message } = output as { message: string };
        setErrorMessage(`${message}, failed to load preview.`);
        setDisplayError(true);
      } catch {
        setErrorMessage('Failed to connect with the server.');
        setDisplayError(true);
      }
    };
    fetch();
  }, [setDisplayError, setErrorMessage]);

  if (!userData) return null;

  return (
    <Box mt={3}>
    <Typography mb={2} fontWeight={700} variant="h5">Ad preview</Typography>
    <AdBase
      published={msToPublishedInfo(previewPublishedDate)}
      {...previewData}
      image={image ? image : declareImgPath(defaultAdImagePath)}
      seller={userData}
    />
    </Box>
  );
};

export default AdPreview;
