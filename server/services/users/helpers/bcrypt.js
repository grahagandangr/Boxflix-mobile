const bcrypt = require("bcryptjs");

const generateHash = (plaintext) => {
  return bcrypt.hashSync(plaintext, 10);
};

const verifyHashWithPlaintext = (plaintext, hash) => {
  return bcrypt.compareSync(plaintext, hash);
};

module.exports = {
  generateHash,
  verifyHashWithPlaintext,
};
