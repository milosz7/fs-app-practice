import { useState, ReactNode } from 'react';
import LoadingContext from '../../Context/LoadingContext';

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>
  );
};

export default LoadingProvider;
