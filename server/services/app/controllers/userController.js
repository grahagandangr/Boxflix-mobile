const { User } = require("../models");
const { verifyHashWithPlaintext } = require("../helpers/bcrypt");
const { generateTokenFromPayload } = require("../helpers/jwt");

class UserController {
  static async registerAdmin(req, res, next) {
    try {
      const { username, email, phoneNumber, address, password } = req.body;
      const newUser = await User.create({ username, email, phoneNumber, address, password });

      res.status(201).json({
        message: `Admin with id: ${newUser.id} and email: ${newUser.email} successfully created`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "EmailRequired" };
      }

      if (!password) {
        throw { name: "PasswordRequired" };
      }

      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw { name: "Unauthorized" };
      }

      const isMatchPassword = verifyHashWithPlaintext(password, foundUser.password);

      if (!isMatchPassword) {
        throw { name: "Unauthorized" };
      }

      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };

      const token = generateTokenFromPayload(payload);

      res.status(200).json({
        access_token: token,
        user: {
          ...payload,
          username: foundUser.username,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
