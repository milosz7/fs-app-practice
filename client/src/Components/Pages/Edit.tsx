import Box from '@mui/system/Box';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdsContext from '../../Context/AdsContext';
import NotFoundError from '../Views/NotFoundError';
import AdDataManipulationForm from '../Features/AdDataManipulationForm';
import AdPreview from '../Features/AdPreview';
import LocalAdDataContext from '../../Context/LocalAdDataContext';
import declareImgPath from '../../utils/declareImgPath';

const Edit = () => {
  const { id } = useParams();
  const { ads } = useContext(AdsContext)!;
  const adData = ads.find(({ _id }) => id === _id.toString());
  const { adFile, setLocalAdData, localAdData } = useContext(LocalAdDataContext)!;

  useEffect(() => {
    if (adData) {
      const { title, description, location, price } = adData;
      setLocalAdData({ title, description, location, price });
    }
  }, [setLocalAdData, adData]);

  if (!adData)
    return (
      <NotFoundError
        title="Something went wrong!"
        message={`Ad data for id: ${id} was not found.`}
      />
    );

  const { _id, title, description, location, price, image } = adData;

  return (
    <Box mt={3}>
      <AdDataManipulationForm
        id={_id}
        prevTitle={title}
        prevDescription={description}
        prevLocation={location}
        prevPrice={price}
      />
      <AdPreview
        image={adFile ? adFile : declareImgPath(image)}
        previewData={localAdData}
      />
    </Box>
  );
};

export default Edit;
