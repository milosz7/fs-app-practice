const censorPhoneNumber = (phone: string) => {
  const hiddenNumberRemainder = 'xxxxxx';
  const numberWithoutLastSixDigits = phone.slice(0, phone.length - 6);
  return numberWithoutLastSixDigits + hiddenNumberRemainder;
};

export default censorPhoneNumber;
