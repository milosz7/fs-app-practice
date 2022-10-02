import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import mongoose from 'mongoose';
import declareImgPath from '../../../utils/declareImgPath';
import { useContext } from 'react';
import AuthContext from '../../../Context/AuthContext';
import DialogControlsContext from '../../../Context/DialogControlsContext';
import useDeleteAdData from '../../../Hooks/useDeleteData';

const AdUserDataContainer = ({
  existingAdData,
  username,
  avatar,
}: {
  existingAdData?: { adId: mongoose.Types.ObjectId; sellerId: mongoose.Types.ObjectId };
  username: string;
  avatar: string;
}) => {
  const { user } = useContext(AuthContext)!;
  const { setupAndOpenDialog } = useContext(DialogControlsContext)!;
  const deleteData = useDeleteAdData();

  const deleteRequest = (id: mongoose.Types.ObjectId) => {
    return setupAndOpenDialog(
      () => deleteData(`/api/ads/${id}`, '/'),
      'Are you sure that you want to delete that ad?'
    );
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
      <Box display="flex" gap={3} alignItems="center">
        <Box
          {...(existingAdData
            ? { component: RouterLink, to: `/profile/${existingAdData.sellerId}` }
            : {})}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            textDecoration: 'none',
            color: 'inherit',
            ...(existingAdData ? { cursor: 'pointer' } : {}),
          }}
        >
          <img
            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '100%' }}
            src={declareImgPath(avatar)}
            alt="seller avatar"
          />
          <Typography sx={{ alignSelf: 'center' }} variant="h6">
            {username}
          </Typography>
        </Box>
        {existingAdData && user && existingAdData.sellerId === user.id && (
          <Box
            sx={{
              display: 'flex',
              alignSelf: 'center',
              ml: 'auto',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <IconButton component={RouterLink} to={`/edit/${existingAdData.adId}`} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteRequest(existingAdData.adId)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AdUserDataContainer;
