const { isEmail, isStrongPassword, isEmpty  , isNumeric , isAlphanumeric} = require("validator");

function validateSignUpField(req) {
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


function validateLogInField(req) {
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


function validateCaptainVechileInfo(vehicleInfo) {
  const { color, number, type, capacity } = vehicleInfo;

  // Check that no field is empty
  let getObjectKey = Object.keys(vehicleInfo);
  const isValidInput = getObjectKey.every(item => !isEmpty(vehicleInfo[item]));

  if (isValidInput) {

    if (typeof color !== 'string' || color.trim() === '') {
      return { isValid: false, message: "Color must be a valid string." };
    }

    if (!isAlphanumeric(number.replace(/[^a-zA-Z0-9]/g, ''), 'en-US', { ignore: ' ' })) {
      return { isValid: false, message: "Invalid number plate format." };
    }

    const validTypes = ["bike", "car","auto"];
    if (!validTypes.includes(type)) {
      return { isValid: false, message: "Type must be either 'bike' or 'car' or 'auto." };
    }

    if (!isNumeric(capacity.toString()) || Number(capacity) <= 0) {
      return { isValid: false, message: "Capacity must be a valid positive number." };
    }

    return { isValid: true, message: "All fields are valid." };
  }

  return { isValid: false, message: "All fields must be filled." };
}


module.exports = {
    validateLogInField,
    validateSignUpField,
    validateCaptainVechileInfo
}
