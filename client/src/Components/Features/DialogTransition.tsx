import React from 'react';
import Zoom from '@mui/material/Zoom';
import { TransitionProps } from '@mui/material/transitions';

const DialogTransition = React.forwardRef<
  React.Ref<HTMLElement>,
  TransitionProps & { children: React.ReactElement<any, any> }
>((props, ref) => {
  return <Zoom ref={ref} {...props} />;
});

export default DialogTransition;
