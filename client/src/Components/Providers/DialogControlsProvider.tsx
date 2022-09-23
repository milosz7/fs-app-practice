import DialogControlsContext from '../../Context/DialogControlsContext';
import { ReactNode, useState } from 'react';

const DialogControlsProvider = ({ children }: { children: ReactNode }) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<Function>(() => {})

  const dispatchAction = () => {
    dialogAction();
    setIsDialogOpen(false)
  }
  

  return <DialogControlsContext.Provider value={{isDialogOpen, setIsDialogOpen, setDialogAction, dispatchAction}}>{children}</DialogControlsContext.Provider>;
};

export default DialogControlsProvider;
