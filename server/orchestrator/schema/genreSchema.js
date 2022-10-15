const { gql } = require("apollo-server");
const axios = require("axios");
const redis = require("../config/redisConnection");
const genresBaseUrl = "https://boxflix-mobile-app.herokuapp.com";

const typeDefs = gql`
  type Genre {
    id: ID
    name: String
  }

  type Query {
    getGenres: [Genre]
  }
`;

const resolvers = {
  Query: {
    getGenres: async () => {
      try {
        const genresCache = await redis.get("app:genres");

        if (genresCache) {
          console.log("dari cache");
          return JSON.parse(genresCache);
        } else {
          console.log("dari axios");
          const { data: genres } = await axios.get(`${genresBaseUrl}/genres`);
          await redis.set("app:genres", JSON.stringify(genres));
          return genres;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
