import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { msToPublishedInfo } from '../../../utils/msToPublishedInfo';

const AdInfoContainer = ({
  title,
  location,
  published,
  price,
}: {
  title: string;
  location: string;
  published: string;
  price: number;
}) => {
  const timeSincePublished = Date.now() - Date.parse(published);
  const publishedDate = new Date(published).toLocaleString();

  return (
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
      <Typography mb={2} color="text.primary" fontWeight={700} variant="h4">{`${
        price ? price : 0
      } USD`}</Typography>
      <Typography mt="auto" color="action.active" variant="body2">{`Published ${msToPublishedInfo(
        timeSincePublished
      )} - ${publishedDate}.`}</Typography>
    </Paper>
  );
};

export default AdInfoContainer;
