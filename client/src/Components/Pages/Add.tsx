import AdDataManipulationForm from '../Features/AdDataManipulationForm';
import AdPreview from '../Features/AdPreview';
import { useContext } from 'react';
import LocalAdDataContext from '../../Context/LocalAdDataContext';
import Box from '@mui/material/Box';
import declareImgPath from '../../utils/declareImgPath';
import { defaultAdImagePath } from '../../constants';

const Add = () => {
  const { localAdData, adFile } = useContext(LocalAdDataContext)!;

  return (
    <Box>
      <AdDataManipulationForm />
      <AdPreview previewData={localAdData} image={adFile ? adFile : declareImgPath(defaultAdImagePath)} />
    </Box>
  );
};

export default Add;
