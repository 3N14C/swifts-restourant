export const determinePluralFood = (number: number) => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return "блюдо";
  } else if (
    number % 10 >= 2 &&
    number % 10 <= 4 &&
    (number % 100 < 10 || number % 100 >= 20)
  ) {
    return "блюда";
  } else {
    return "блюд";
  }
};
