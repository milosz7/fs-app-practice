import { createContext } from 'react';

interface DialogContextInterface {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  // action: Function;
  setDialogAction: (func: Function) => void;
  dispatchAction: () => void;
}

const DialogControlsContext = createContext<DialogContextInterface | null>(null);

export default DialogControlsContext;
