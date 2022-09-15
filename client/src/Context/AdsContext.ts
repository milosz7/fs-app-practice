import { createContext } from 'react';
import { AdsContextInterface } from '../../../interfaces/AdsContext';

const AdsContext = createContext<AdsContextInterface | null>(null);

export default AdsContext;