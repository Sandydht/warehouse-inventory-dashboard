export const validatePassword = (password: string): void => {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    throw new Error("Password must contain lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    throw new Error("Password must contain number");
  }
};
