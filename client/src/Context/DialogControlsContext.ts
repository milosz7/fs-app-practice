import { createContext } from 'react';

interface DialogContextInterface {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  dispatchAction: () => void;
  dialogTitle: string;
  setupAndOpenDialog: (action: Function, title: string) => void;
}

const DialogControlsContext = createContext<DialogContextInterface | null>(null);

export default DialogControlsContext;
