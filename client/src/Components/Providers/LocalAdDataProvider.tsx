import { ReactNode, useState } from 'react';
import LocalAdDataContext from '../../Context/LocalAdDataContext';
import { defaultAdValue } from '../../constants';

const AdDataProvider = ({ children }: { children: ReactNode }) => {
  const [localAdData, setLocalAdData] = useState(defaultAdValue);
  const [adFile, setAdFile] = useState<File | null>(null)
  const updateLocalAdData = (field: keyof typeof defaultAdValue, value: string | number) => {
    setLocalAdData({ ...localAdData, [field]: value });
  };

  return <LocalAdDataContext.Provider value={{localAdData, adFile, setAdFile, updateLocalAdData, setLocalAdData}}>{children}</LocalAdDataContext.Provider>;
};

export default AdDataProvider;
