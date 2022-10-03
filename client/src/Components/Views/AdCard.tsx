import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import declareImgPath from '../../utils/declareImgPath';
import { Link as RouterLink } from 'react-router-dom';
import mongoose from 'mongoose';
import { useTheme } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

const AdCard = ({
  image,
  title,
  location,
  id,
}: {
  image: string;
  title: string;
  location: string;
  id: mongoose.Types.ObjectId;
}) => {
  const imagePath = declareImgPath(image);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/ads/${id}`)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: matches ? 'row' : 'column',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        cursor: 'pointer',
      }}
    >
      <CardMedia
        height={200}
        component="img"
        alt={title}
        image={imagePath}
        sx={{ objectFit: 'cover', ...(matches ? { maxWidth: 250 } : {}) }}
      />
      <CardContent>
        <Typography fontWeight={700} variant="h6">
          {title}
        </Typography>
        <Typography sx={{ mt: 1 }} color="gray" variant="body2">
          {location}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 'auto' }}></CardActions>
    </Card>
  );
};

export default AdCard;
