export const isValidEmail = (email: string): void => {
  const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email");
  }
};
