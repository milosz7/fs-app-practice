import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { FormHelperText } from '@mui/material';
import { useContext, FormEvent, useEffect } from 'react';
import LocalAdDataContext from '../../Context/LocalAdDataContext';
import mongoose from 'mongoose';
import useSendFormData from '../../Hooks/useSendFormData';

const AdDataManipulationForm = ({
  id,
  prevTitle,
  prevLocation,
  prevPrice,
  prevDescription,
}: {
  id?: mongoose.Types.ObjectId;
  prevTitle?: string;
  prevLocation?: string;
  prevPrice?: number;
  prevDescription?: string;
}) => {
  const uploadFormData = useSendFormData();
  const { setLocalAdData, setAdFile, updateLocalAdData, localAdData, adFile } =
    useContext(LocalAdDataContext)!;
  useEffect(() => {
    if (prevTitle && prevLocation && prevPrice && prevDescription) {
      console.log(prevTitle, prevPrice, prevLocation);
      setLocalAdData({
        title: prevTitle,
        location: prevLocation,
        price: prevPrice,
        description: prevDescription,
      });
    }
  }, [prevTitle, prevLocation, prevPrice, prevDescription, setLocalAdData]);

  const saveOrUploadData = async (e: FormEvent) => {
    e.preventDefault();
    const endpoint = id ? `/api/ads/${id}` : '/api/ads';
    const method = id ? 'PUT' : 'POST';
    const formData = new FormData();
    (Object.keys(localAdData) as (keyof typeof localAdData)[]).forEach((key) => {
      formData.append(key, localAdData[key].toString());
    });
    if (adFile) {
      formData.append('image', adFile);
    }
    await uploadFormData(formData, method, endpoint, '/');
  };

  const { price, location, description, title } = localAdData;

  return (
    <Box ml={-2} pt={3}>
      <Typography fontWeight={700} ml={2} mb={2} variant="h5">
        {id ? 'Edit ad data' : 'Add a new ad'}
      </Typography>
      <Grid
        onSubmit={saveOrUploadData}
        sx={{ maxWidth: '90vw' }}
        mx="auto"
        spacing={2}
        container
        component="form"
      >
        <Grid item xs={10}>
          <TextField
            required
            sx={{ width: '100%' }}
            placeholder="Must be between 10 and 50 characters."
            label="Title"
            value={title}
            onChange={(e) => updateLocalAdData('title', e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            type="number"
            value={price ? price : ''}
            inputProps={{ min: 0 }}
            onChange={(e) => updateLocalAdData('price', parseInt(e.target.value))}
            required
            sx={{ width: '100%' }}
            label="Price"
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            value={location}
            onChange={(e) => updateLocalAdData('location', e.target.value)}
            required
            sx={{ width: '100%' }}
            label="Location"
          />
        </Grid>
        <Grid item xs={5}>
          <Box
            component="label"
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
                mr: 1,
              }}
              size="small"
              component="label"
              variant="contained"
            >
              Upload
              <input
                name="image"
                onChange={(e) => setAdFile(e.target.files![0])}
                hidden
                accept="image/"
                type="file"
              />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={description}
            onChange={(e) => updateLocalAdData('description', e.target.value)}
            placeholder="Must be between 20 and 1000 characters."
            label="Description"
            required
            multiline
            rows={8}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid mt={-1} item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <FormHelperText>* - Required fields</FormHelperText>
            <Button variant="contained" type="submit">
              {id ? 'confirm changes' : 'upload'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdDataManipulationForm;
