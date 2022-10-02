import Paper from '@mui/material/Paper';
import Zoom from '@mui/material/Zoom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { dataUpdateDelayInMs, transitionFinishDelayInMs } from '../../../constants';
import censorPhoneNumber from '../../../utils/censorPhoneNumber';


const AdContactContainer = ({ phone }: { phone: string }) => {
  const [displayedPhone, setDisplayedPhone] = useState('');
  const [displayPhoneData, setDisplayPhoneData] = useState(true);

  useEffect(() => {
    setDisplayedPhone(censorPhoneNumber(phone))
  }, [setDisplayedPhone, phone])

  const animateTransition = () => {
    setDisplayPhoneData(false);
    setTimeout(() => {
      setDisplayedPhone(phone);
    }, dataUpdateDelayInMs);
    setTimeout(() => {
      setDisplayPhoneData(true);
    }, transitionFinishDelayInMs);
  };

  return (
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
  );
};

export default AdContactContainer;
