import React from 'react';
import Box from '@mui/material/Box';

const CenteringBox = ({ children }: { children: React.ReactNode }) => {
  const navigationHeightInPx = 64;
  const loadingBarHeigthInPx = 4;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flexWrap="nowrap"
      height={`calc(100vh - ${navigationHeightInPx + loadingBarHeigthInPx}px)`}
    >
      {children}
    </Box>
  );
};

export default CenteringBox;
