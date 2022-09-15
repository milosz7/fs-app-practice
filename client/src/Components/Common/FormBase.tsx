import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

const FormBase = ({
  title,
  buttonText,
  children,
}: {
  title: string;
  buttonText: string;
  children: React.ReactNode;
}) => {
  return (
    <Paper elevation={3} sx={{ px: 3, py: 5 }} component="form">
      <Typography color="action" mb={2} variant="h6">
        {title}
      </Typography>
      <FormControl>
        {children}
        <Button type="submit" sx={{ mx: 'auto', mt: 3 }} variant="contained">
          {buttonText}
        </Button>
      </FormControl>
    </Paper>
  );
};

export default FormBase;
