import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { AdData } from '../../Context/AdsContext';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { FormHelperText } from '@mui/material';

const AdDataManipulationForm = ({ data }: { data?: AdData }) => {
  return (
    <Box ml={-2} pt={3}>
      <Typography fontWeight={700} ml={2} mb={2} variant="h5">
        {data ? 'Edit ad data' : 'Add a new ad'}
      </Typography>
      <Grid sx={{ maxWidth: '90vw' }} mx="auto" spacing={2} container component="form">
        <Grid item xs={10}>
          <TextField required sx={{ width: '100%' }} label="Title" />
        </Grid>
        <Grid item xs={2}>
          <TextField required sx={{ width: '100%' }} label="Price" />
        </Grid>
        <Grid item xs={7}>
          <TextField required sx={{ width: '100%' }} label="Location" />
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              pl: 1.5,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              height: 'calc(100% - 2px)',
              border: '1px solid',
              borderColor: 'grey.400',
              '&:hover': { borderColor: 'grey.900' },
            }}
          >
            <Typography color="action.active" variant="body1">
              Ad picture
            </Typography>
            <CameraAltIcon sx={{ color: 'action.active', ml: 0.5 }} />
            <Button
                sx={{
                  ml: 'auto',
                  mr: 1
                }}
                size="small"
                component="label"
                variant="contained"
              >
                Upload
                <input
                  name="avatar"
                  hidden
                  accept="image/"
                  type="file"
                />
              </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Description" required multiline rows={8} sx={{ width: '100%' }} />
        </Grid>
        <Grid mt={-1} item xs={12}>
          <FormHelperText>* - Required fields</FormHelperText>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdDataManipulationForm;
