const { isEmail, isStrongPassword, isEmpty } = require("validator");

function validateLogInField(req) {
  const INPUT_BY_USER = req.body;
  

  // Check if any required fields are empty
  const requiredFields = [
    "firstName",
    "lastName",
    "emailId",
    "password",
  ];

  const emptyFields = requiredFields.filter((item) => isEmpty(INPUT_BY_USER[item]));

  if (emptyFields.length > 0) {
    throw new Error(`The following fields are invalid: ${emptyFields.join(", ")}`);
  }

  return (
    isEmail(INPUT_BY_USER?.emailId) &&
    isStrongPassword(INPUT_BY_USER?.password)
  );
}


function validateSignInField(req) {
  const INPUT_BY_USER = req.body;

  // Check if any required fields are empty
  const requiredFields = [
    "emailId",
    "password",
  ];

  const emptyFields = requiredFields.filter((item) => isEmpty(INPUT_BY_USER[item]));

  if (emptyFields.length > 0) {
    throw new Error(`The following fields are invalid: ${emptyFields.join(", ")}`);
  }

  // Validate email and password strength
  const isEmailValid = isEmail(INPUT_BY_USER?.emailId);
  const isPasswordStrong = isStrongPassword(INPUT_BY_USER?.password, { minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 });

  if (!isEmailValid || !isPasswordStrong) {
    throw new Error("Email or password does not meet the required criteria.");
  }

  return true; 
}


module.exports = {
    validateLogInField,
    validateSignInField
}
