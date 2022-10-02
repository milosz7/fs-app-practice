import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ButtonGroup, FormHelperText } from '@mui/material';
import { useContext, FormEvent, useEffect, useRef, useState } from 'react';
import LocalAdDataContext from '../../Context/LocalAdDataContext';
import mongoose from 'mongoose';
import useSendFormData from '../../Hooks/useSendFormData';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom'

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

  const navigate = useNavigate();
  const theme = useTheme();
  const shouldBeBigger = useMediaQuery(theme.breakpoints.up('sm'));

  const [fileInputHeight, setFileInputHeight] = useState(0);
  const inputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const invisibleHeightRemainderInPx = 2;
    if (inputRef.current)
      setFileInputHeight(inputRef.current.clientHeight - invisibleHeightRemainderInPx);
  }, [setFileInputHeight]);

  useEffect(() => {
    if (prevTitle && prevLocation && prevPrice && prevDescription) {
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
        <Grid item xs={12} md={10}>
          <TextField
            ref={inputRef}
            required
            sx={{ width: '100%', background: 'white' }}
            placeholder="Must be between 10 and 50 characters."
            label="Title"
            value={title}
            onChange={(e) => updateLocalAdData('title', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            type="number"
            value={price ? price : ''}
            inputProps={{ min: 0 }}
            onChange={(e) => updateLocalAdData('price', parseInt(e.target.value))}
            required
            sx={{ width: '100%', background: 'white'  }}
            label="Price"
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <TextField
            value={location}
            onChange={(e) => updateLocalAdData('location', e.target.value)}
            required
            sx={{ width: '100%', background: 'white'  }}
            label="Location"
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box
            component="label"
            sx={{
              pl: 1.5,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              height: fileInputHeight,
              border: '1px solid',
              borderColor: 'grey.400',
              '&:hover': { borderColor: 'grey.900' },
              background: 'white' 
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
            sx={{ width: '100%', background: 'white'  }}
          />
        </Grid>
        <Grid mt={-1} item xs={12}>
          <Box
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            display="flex"
            justifyContent="space-between"
          >
            <FormHelperText sx={{mb: 1}}>* - Required fields</FormHelperText>
            <ButtonGroup sx={{alignSelf: 'flex-end'}} size={shouldBeBigger ? 'medium' : 'small'}>
              <Button onClick={() => navigate(-1)} sx={{ mr: 1 }} variant="contained" color="error">
                cancel
              </Button>
              <Button variant="contained" type="submit">
                {id ? 'confirm changes' : 'upload'}
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdDataManipulationForm;
