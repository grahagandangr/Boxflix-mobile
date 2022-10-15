const User = require("../models/User");

class UserController {
  static async postUser(req, res, next) {
    try {
      const { username, email, phoneNumber, address, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        phoneNumber,
        address,
        password,
        role: "admin",
      });
      res.status(201).json({ message: `User with id: ${newUser.id} and email: ${newUser.email} created successfully` });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const users = await User.findAll();
      users.forEach((el) => {
        delete el.password;
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { _id } = req.params;
      const user = await User.findByPk(_id);
      if (!user) {
        throw { name: "NotFound" };
      }
      delete user.password;
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { _id } = req.params;
      const user = await User.findByPk(_id);
      if (!user) {
        throw { name: "NotFound" };
      }
      await User.destroy(_id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
