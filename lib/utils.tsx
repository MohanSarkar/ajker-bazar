// English number to Bangla number
export const toBanglaNumeral = (num: number | string): string => {
  const banglaDigits: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', '.': '.'
  };
  return num
    .toString()
    .split('')
    .map((digit) => banglaDigits[digit] || digit)
    .join('');
};

// Bangla Currency Formatter
export const formatBanglaPrice = (amount: number): string => {
  const formatted = amount.toLocaleString('bn-BD');
  return `${formatted} টাকা`;
};

// Current Bangla Date Helper
export const getBanglaDate = (): string => {
  return new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};