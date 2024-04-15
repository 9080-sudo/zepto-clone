function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) return true;
  return false;
}

function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{}|;:'",<.>/?]).{8,}$/;
  if (passwordRegex.test(password)) return true;
  return false;
}

function isValidName(name) {
  const nameRegex = /^[a-zA-Z]+(?:-[a-zA-Z]+)?(?: [a-zA-Z]+(?:-[a-zA-Z]+)?)*$/;
  if (nameRegex.test(name)) return true;
  return false;
}

export { isValidEmail, isValidPassword, isValidName };
