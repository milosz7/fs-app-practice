import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import { useRef, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchBarInput from './SearchBarInput';
import SearchBarContainer from './SearchBarContainer';
import SearchIconWrapper from './SearchIconWrapper';

const SearchBar = ({}) => {
  // const searchQuery = useRef<null | string>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchBarContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchBarInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search.."
      />
      {searchQuery && (
        <CancelIcon onClick={() => setSearchQuery('')}
          sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
        />
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
