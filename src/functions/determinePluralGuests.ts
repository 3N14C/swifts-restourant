export const determinePluralGuests = (number: number) => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return "гость";
  } else if (
    number % 10 >= 2 &&
    number % 10 <= 4 &&
    (number % 100 < 10 || number % 100 >= 20)
  ) {
    return "гостя";
  } else {
    return "гостей";
  }
};
