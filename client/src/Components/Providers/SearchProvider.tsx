import SearchContext from '../../Context/SearchContext';
import { ReactNode, useState, KeyboardEvent } from 'react';
import { useContext } from 'react';
import AdsContext from '../../Context/AdsContext';
import { useNavigate } from 'react-router-dom';
import { enterKeyValue, debounceTimeoutInMs } from '../../constants';

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<null | NodeJS.Timeout>(null);
  const { fetchAdsToState } = useContext(AdsContext)!;
  const navigate = useNavigate();

  const clearDebounce = () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      setSearchTimeout(null);
    }
  };

  const dispatchSearch = async () => {
    clearDebounce();
    await fetchAdsToState(searchQuery);
    navigate('/', { state: { query: searchQuery } });
  };

  const resetSearchResults = async () => {
    setSearchQuery('');
    await fetchAdsToState('');
    navigate('/')
  }

  const debounceSearch = async (e: KeyboardEvent) => {
    if (searchTimeout) clearDebounce();
    if (e.key !== enterKeyValue) {
      setSearchTimeout(
        setTimeout(() => {
          console.log('test');
          fetchAdsToState(searchQuery);
          navigate('/', { state: { query: searchQuery } });
        }, debounceTimeoutInMs)
      );
    }
  };

  return <SearchContext.Provider value={{debounceSearch, dispatchSearch, searchQuery, setSearchQuery, resetSearchResults}}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
