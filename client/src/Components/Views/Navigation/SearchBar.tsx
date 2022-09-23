import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchBarInput from './SearchBarInput';
import SearchBarContainer from './SearchBarContainer';
import SearchIconWrapper from './SearchIconWrapper';
import SearchContext from '../../../Context/SearchContext';

const SearchBar = () => {
  const { debounceSearch, dispatchSearch, searchQuery, setSearchQuery, resetSearchResults } =
    useContext(SearchContext)!;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatchSearch();
  };

  return (
    <SearchBarContainer onSubmit={(e) => handleSubmit(e)}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchBarInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={(e) => debounceSearch(e)}
        placeholder="Search.."
      />
      {searchQuery && (
        <CancelIcon
          onClick={() => resetSearchResults()}
          sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
        />
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
