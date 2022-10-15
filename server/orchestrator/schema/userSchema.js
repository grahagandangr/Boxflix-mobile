const { gql } = require("apollo-server");
const axios = require("axios");
const redis = require("../config/redisConnection");
const usersBaseUrl = "https://boxflix-mobile-users.herokuapp.com";

const typeDefs = gql`
  type User {
    _id: String
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  input UserInput {
    username: String
    email: String
    phoneNumber: String
    address: String
    password: String
  }

  type Query {
    getUsers: [User]
    getUserById(_id: ID): User
  }

  type Mutation {
    deleteUser(_id: ID): String
    postUser(newUser: UserInput): String
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const usersCache = await redis.get("users:users");

        if (usersCache) {
          console.log("dari cache");
          return JSON.parse(usersCache);
        } else {
          console.log("dari axios");
          const { data: users } = await axios.get(`${usersBaseUrl}/users`);
          await redis.set("users:users", JSON.stringify(users));
          return users;
        }
      } catch (err) {
        console.log(err);
      }
    },
    getUserById: async (_, args) => {
      try {
        const { _id } = args;
        const userCache = await redis.get(`users:users:${_id}`);
        if (userCache) {
          console.log("dari cache");
          return JSON.parse(userCache);
        } else {
          console.log("dari axios");
          const { data: user } = await axios.get(`${usersBaseUrl}/users/${_id}`);
          await redis.set(`users:users:${_id}`, JSON.stringify(user));
          return user;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    deleteUser: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios.delete(`${usersBaseUrl}/users/${_id}`);

        const userCache = await redis.get(`users:users`);

        if (userCache) {
          const users = JSON.parse(userCache).filter((user) => user._id != _id);
          await redis.set("users:users", JSON.stringify(users));
        }

        return data.message;
      } catch (err) {
        console.log(err);
      }
    },
    postUser: async (_, args) => {
      try {
        const { username, email, phoneNumber, address, password } = args.newUser;
        const { data } = await axios.post(`${usersBaseUrl}/users`, {
          username,
          email,
          phoneNumber,
          address,
          password,
        });
        await redis.del("users:users");
        return data.message;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
