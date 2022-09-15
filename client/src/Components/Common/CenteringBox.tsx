import React from 'react';
import Box from '@mui/material/Box';

const CenteringBox = ({ children }: { children: React.ReactNode }) => {
  const navigationHeightInPx = 64;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flexWrap="nowrap"
      height={`calc(100vh - ${navigationHeightInPx}px)`}
    >
      {children}
    </Box>
  );
};

export default CenteringBox;
