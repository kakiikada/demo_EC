export const validateKana = (value: string) => {
  return /^[ァ-ヶー　\s]+$/.test(value);
};
export const validateEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};
export const validatePhone = (value: string) => {
  const phoneNumber = value.replace(/-/g, "");

  return /^[0-9-]+$/.test(value)
    && phoneNumber.length >= 10
    && phoneNumber.length <= 11;
};
export const validatePostalCode = (value: string) => {
  return /^\d{3}-?\d{4}$/.test(value);
};