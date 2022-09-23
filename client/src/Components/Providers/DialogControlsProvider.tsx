import DialogControlsContext from '../../Context/DialogControlsContext';
import { ReactNode, useState } from 'react';

const DialogControlsProvider = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<Function>(() => {});
  const [dialogTitle, setDialogTitle] = useState('');

  const dispatchAction = () => {
    dialogAction();
    setIsDialogOpen(false);
  };

  return (
    <DialogControlsContext.Provider
      value={{
        isDialogOpen,
        setIsDialogOpen,
        setDialogAction,
        dispatchAction,
        dialogTitle,
        setDialogTitle,
      }}
    >
      {children}
    </DialogControlsContext.Provider>
  );
};

export default DialogControlsProvider;
