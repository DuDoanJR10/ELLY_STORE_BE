export function getRandomSixDigitString() {
  let result = '';
  const digits = '0123456789';

  for (let i = 0; i < 6; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return result;
}
