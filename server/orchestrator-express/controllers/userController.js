const redis = require("../config/redisConnection");
const axios = require("axios");
const usersBaseUrl = "http://localhost:4001";

class UserController {
  static async getAllUser(req, res) {
    try {
      const usersCache = await redis.get("users:users");
      if (usersCache) {
        console.log("dari cache");
        return res.status(200).json(JSON.parse(usersCache));
      } else {
        console.log("dari axios");
        const { data: users } = await axios.get(`${usersBaseUrl}/users`);
        await redis.set("users:users", JSON.stringify(users));
        return res.status(200).json(users);
      }
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const { _id } = req.params;
      const userCache = await redis.get(`users:users:${_id}`);
      if (userCache) {
        console.log("dari cache");
        return res.status(200).json(JSON.parse(userCache));
      } else {
        console.log("dari axios");
        const { data: user, status } = await axios.get(`${usersBaseUrl}/users/${_id}`);
        await redis.set(`users:users:${_id}`, JSON.stringify(user));
        return res.status(status).json(user);
      }
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async postUser(req, res) {
    try {
      const { username, email, phoneNumber, address, password } = req.body;
      const { data, status } = await axios.post(`${usersBaseUrl}/users`, {
        username,
        email,
        phoneNumber,
        address,
        password,
      });
      await redis.del("users:users");
      return res.status(status).json({ message: data.message });
    } catch (err) {
      console.log(err);
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { _id } = req.params;
      const { data, status } = await axios.delete(`${usersBaseUrl}/users/${_id}`);

      const userCache = await redis.get(`users:users`);

      if (userCache) {
        const users = JSON.parse(userCache).filter((user) => user._id != _id);
        await redis.set("users:users", JSON.stringify(users));
      }
      return res.status(status).json({ message: data.message });
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }
}

module.exports = UserController;
