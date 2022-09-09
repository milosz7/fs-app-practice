export const createPhoneRegex = (phone: string) => {
  const trimmedPhoneNumber = phone.slice(-9);
  return new RegExp('(?!\\+48)' + trimmedPhoneNumber);
};
