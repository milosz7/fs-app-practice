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

  const setupAndOpenDialog = (action: Function, title: string) => {
    setDialogAction(() => action);
    setDialogTitle(title);
    setIsDialogOpen(true);
  };

  return (
    <DialogControlsContext.Provider
      value={{
        isDialogOpen,
        setIsDialogOpen,
        dispatchAction,
        dialogTitle,
        setupAndOpenDialog,
      }}
    >
      {children}
    </DialogControlsContext.Provider>
  );
};

export default DialogControlsProvider;
