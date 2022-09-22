import { createContext } from 'react';
import { defaultAdValue } from '../constants';

interface LocalAdDataInterface {
  localAdData: typeof defaultAdValue
  adFile: File | null;
  setAdFile: (file: File) => void;
  updateLocalAdData: (field: keyof typeof defaultAdValue, value: string | number) => void;
  setLocalAdData: (data: typeof defaultAdValue) => void;
}

const LocalAdDataContext = createContext<LocalAdDataInterface | null>(null);

export default LocalAdDataContext;
