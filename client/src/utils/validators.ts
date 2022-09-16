export const validateUsername = (username: string) => {
  const usernameRegexp = /^[A-Za-z0-9\-_.]{3,16}$/;
  return usernameRegexp.test(username);
};

export const validatePhoneNumber = (number: string) => {
  const phoneNumberRegexp =
    /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/;
  return phoneNumberRegexp.test(number);
};

export const validatePassword = (password: string) => {
  const passwordRegexp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
  return passwordRegexp.test(password);
};

export const validateTitle = (title: string) => {
  const titleRegexp = /[A-Za-z0-9-_:.\s]{10,50}/;
  const titleMatch = title.match(titleRegexp);
  if (titleMatch) {
    return titleMatch.join('').length === title.length;
  }
  return false;
};
