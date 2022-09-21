import { createContext } from 'react';
import { defaultAdValue } from '../constants';

interface LocalAdDataInterface {
  localAdData: typeof defaultAdValue
  adFile: File | null;
  setAdFile: (file: File) => void;
  updateLocalData: (field: keyof typeof defaultAdValue, value: string) => void;
}

const LocalAdDataContext = createContext<LocalAdDataInterface | null>(null);

export default LocalAdDataContext;
