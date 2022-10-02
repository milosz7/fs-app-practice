import Box from '@mui/material/Box';
import { useState, useCallback, useEffect } from 'react';

const AdImageContainer = ({
  pathOrFile,
  altText,
}: {
  pathOrFile: string | File;
  altText: string;
}) => {
  const [displayedImageURL, setDisplayedImageURL] = useState('');
  
  const declareImageType = useCallback(() => {
    if (typeof pathOrFile === 'string') {
      return setDisplayedImageURL(pathOrFile);
    }
    setDisplayedImageURL(URL.createObjectURL(pathOrFile));
  }, [pathOrFile]);

  useEffect(() => {
    declareImageType();
  }, [declareImageType]);

  return (
    <Box>
      <img
        src={displayedImageURL}
        alt={altText}
        style={{
          width: '100%',
          objectFit: 'cover',
          borderRadius: 'inherit',
          height: '100%',
          maxHeight: 500,
        }}
      />
    </Box>
  );
};

export default AdImageContainer;
