import {
  isEmail,
  isStrongPassword,
  isLength,
  isAlphanumeric,
  isNumeric,
  isEmpty,
} from "validator";

export function validateSignUpForm(InputByUser) {
  const { firstName, lastName, emailId, password } = InputByUser;

  let getObjectKey = Object.keys(InputByUser);

  const isValidInput = getObjectKey.every(
    (item) => !isEmpty(InputByUser[item])
  );

  if (isValidInput) {
    // Validate email format
    if (!isEmail(emailId)) {
      return { isValid: false, message: "Invalid email format." };
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return { isValid: false, message: "Password must be strong." };
    }

    // Validate name length
    if (
      !isLength(firstName, { min: 3, max: 14 }) ||
      !isLength(lastName, { min: 3, max: 14 })
    ) {
      return {
        isValid: false,
        message: "First and last names must be between 3 and 14 characters.",
      };
    }

    return { isValid: true, message: "All fields are valid." };
  }

  return { isValid: false, message: "All fields must be filled." };
}

export function validateLoginForm(InputByUser) {
  const { emailId, password } = InputByUser;

  let getObjectKey = Object.keys(InputByUser);

  const isValidInput = getObjectKey.every(
    (item) => !isEmpty(InputByUser[item])
  );

  if (isValidInput) {
    // Validate email format
    if (!isEmail(emailId)) {
      return { isValid: false, message: "Invalid email format." };
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return { isValid: false, message: "Password must be strong." };
    }

    return { isValid: true, message: "All fields are valid." };
  }

  return { isValid: false, message: "All fields must be filled." };
}
export function validateCaptainSignUpForm(payload) {
  const { firstName, lastName, emailId, password, vehicleInfo } = payload;

  console.log(payload);

  // Check that no field is empty, including fields in vehicleInfo
  let getObjectKey = Object.keys(payload);
  const isValidInput = getObjectKey.every((item) => {
    if (item === "vehicleInfo") {
      // Special handling for vehicleInfo: Check its individual properties
      const vehicleInfoKeys = Object.keys(vehicleInfo);
      return vehicleInfoKeys.every((vehicleField) => !isEmpty(vehicleInfo[vehicleField]));
    } else {
      // Regular check for non-vehicleInfo fields
      return !isEmpty(payload[item]);
    }
  });

  // If inputs are valid, proceed to further validations
  if (isValidInput) {
    // Validate email format
    if (!isEmail(emailId)) {
      return { isValid: false, message: "Invalid email format." };
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return { isValid: false, message: "Password must be strong." };
    }

    // Validate name length (3 to 14 characters)
    if (
      !isLength(firstName, { min: 3, max: 14 }) ||
      !isLength(lastName, { min: 3, max: 14 })
    ) {
      return {
        isValid: false,
        message: "First and last names must be between 3 and 14 characters.",
      };
    }

    // Validate vehicleInfo fields
    if (typeof vehicleInfo.color !== "string" || vehicleInfo.color.trim() === "") {
      return { isValid: false, message: "Color must be a valid string." };
    }

    if (
      !isAlphanumeric(vehicleInfo.number.replace(/[^a-zA-Z0-9]/g, ""), "en-US", {
        ignore: " ",
      })
    ) {
      return { isValid: false, message: "Invalid number plate format." };
    }

    const validTypes = ["bike", "car", "auto"];
    if (!validTypes.includes(vehicleInfo.type)) {
      return {
        isValid: false,
        message: "Vehicle type must be either 'bike', 'car', or 'auto'.",
      };
    }

    if (!isNumeric(vehicleInfo.capacity.toString()) || Number(vehicleInfo.capacity) <= 0) {
      return {
        isValid: false,
        message: "Capacity must be a valid positive number.",
      };
    }

    return { isValid: true, message: "All fields are valid." };
  }

  return { isValid: false, message: "All fields must be filled." };
}
