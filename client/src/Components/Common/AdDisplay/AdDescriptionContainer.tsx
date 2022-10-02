import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const AdDescriptionContainer = ({ description }: {description: string}) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
      <Typography sx={{ mb: 2 }} variant="h5">
        About the product:
      </Typography>
      <Typography variant="body1" lineHeight={1.5} sx={{ overflowWrap: 'break-word' }}>
        {description}
      </Typography>
    </Paper>
  );
};

export default AdDescriptionContainer;
