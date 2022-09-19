import SearchIcon from '@mui/icons-material/Search';
import { useState, useContext } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchBarInput from './SearchBarInput';
import SearchBarContainer from './SearchBarContainer';
import SearchIconWrapper from './SearchIconWrapper';
import AdsContext from '../../../Context/AdsContext';
import ErrorsContext from '../../../Context/ErrorsContext';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { fetchAdsToState } = useContext(AdsContext)!;
  const { setErrorMessage, setDisplayError } = useContext(ErrorsContext)!;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
      const output = await fetchAdsToState(searchQuery);
      if (output) {
        setErrorMessage(output);
        setDisplayError(true)
      }
    }

  return (
    <SearchBarContainer onSubmit={(e) => handleSubmit(e)}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchBarInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search.."
      />
      {searchQuery && (
        <CancelIcon
          onClick={() => setSearchQuery('')}
          sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
        />
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
