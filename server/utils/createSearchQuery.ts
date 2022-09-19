export const createSearchQuery = (query: string) => {
  return new RegExp('(?=.*' + query + ').*', 'i');
};
