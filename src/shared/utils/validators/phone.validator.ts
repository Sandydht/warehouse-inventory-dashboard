export const validatePhoneNumber = (phone: string): void => {
  const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;

  if (!phoneRegex.test(phone)) {
    throw new Error("Invalid phone number");
  }
};
