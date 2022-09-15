import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import declareImgPath from '../../utils/declareImgPath';
import { Link as RouterLink } from 'react-router-dom'
import mongoose from 'mongoose';

const AdCard = ({
  image,
  title,
  location,
  id
}: {
  image: string;
  title: string;
  location: string;
  id: mongoose.Types.ObjectId
}) => {

  const imagePath = declareImgPath(image);

  return (
    <Card>
      <CardMedia
        height={300}
        component="img"
        alt={title}
        image={imagePath}
      />
      <CardContent>
        <Typography fontWeight={700} variant="h6">
          {title}
        </Typography>
        <Typography sx={{mt: 1}} color="gray" variant="body2">
          {location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={RouterLink} to={'ad/' + id} color="primary" variant="text">
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdCard;
