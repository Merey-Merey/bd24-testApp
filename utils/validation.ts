export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('Пароль должен быть не менее 6 символов');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну заглавную букву');
  }

  if (!/\d/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну цифру');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateForm = (data: {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!validateEmail(data.email)) {
    errors.email = 'Введите корректный email';
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0];
  }

  if (data.name && !validateName(data.name)) {
    errors.name = 'Имя должно содержать не менее 2 символов';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Введите корректный номер телефона';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};