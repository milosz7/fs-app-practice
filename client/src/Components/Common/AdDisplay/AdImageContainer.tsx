import Box from '@mui/material/Box';

const AdImageContainer = ({ path, altText }: { path: string; altText: string }) => {
  return (
    <Box>
      <img
        src={path}
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
