const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { generateHash } = require("../helpers/bcrypt");

class User {
  static users() {
    const db = getDatabase();
    return db;
  }

  static async findAll() {
    try {
      const users = await this.users().collection("users").find({}).toArray();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async findByPk(_id) {
    try {
      const user = await this.users().collection("users").findOne({ _id: ObjectId(_id) });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async create(user) {
    try {
      const newUser = await this.users()
        .collection("users")
        .insertOne({ ...user, password: generateHash(user.password) });
      const passingNewUser = {
        id: newUser.insertedId,
        email: user.email,
      };
      return passingNewUser;
    } catch (error) {
      throw error;
    }
  }

  static async destroy(_id) {
    try {
      const result = await this.users().collection("users").deleteOne({ _id: ObjectId(_id) });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
