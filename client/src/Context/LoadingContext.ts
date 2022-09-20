import { createContext } from "react";

interface LoadingContextInterface {
  loading: boolean;
  setLoading: (status: boolean) => void;
}

const LoadingContext = createContext<LoadingContextInterface | null>(null);

export default LoadingContext;