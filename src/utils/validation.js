const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName) {
    throw new Error("First name is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email Id is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

module.exports = { validateSignUp };
