import { createContext, KeyboardEvent } from 'react';

interface SearchContextInterface {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  dispatchSearch: () => Promise<void>;
  debounceSearch: (e: KeyboardEvent) => Promise<void>;
  resetSearchResults: () => Promise<void>
}

const SearchContext = createContext<SearchContextInterface | null>(null);

export default SearchContext;
