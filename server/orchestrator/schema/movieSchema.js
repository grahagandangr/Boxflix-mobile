const { gql } = require("apollo-server");
const axios = require("axios");
const redis = require("../config/redisConnection");
const moviesBaseUrl = "https://boxflix-mobile-app.herokuapp.com";
const usersBaseUrl = "https://boxflix-mobile-users.herokuapp.com";

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    slug: String
    synopsis: String
    trailerUrl: String
    posterImgUrl: String
    backdropImgUrl: String
    rating: Int
    genreId: Int
    UserMongoId: String
    Casts: [Cast]
    Genre: Genre
    User: User
  }

  type Genre {
    id: ID
    name: String
  }

  type User {
    _id: String
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type Cast {
    id: ID
    movieId: Int
    name: String
    character: String
    profilePict: String
  }

  input MovieInput {
    title: String
    synopsis: String
    trailerUrl: String
    posterImgUrl: String
    backdropImgUrl: String
    rating: Int
    genreId: Int
    cast1Name: String
    cast1Character: String
    cast1ProfilePict: String
    cast2Name: String
    cast2Character: String
    cast2ProfilePict: String
    UserMongoId: String
  }

  input MovieUpdateInput {
    title: String
    synopsis: String
    trailerUrl: String
    posterImgUrl: String
    backdropImgUrl: String
    rating: Int
    genreId: Int
    UserMongoId: String
  }

  type Query {
    getMovies: [Movie]
    getMovieById(id: ID): Movie
  }

  type Mutation {
    deleteMovie(id: ID): String
    postAddMovie(newMovie: MovieInput): String
    putMovie(id: ID, newMovie: MovieUpdateInput): String
  }
`;

const resolvers = {
  Query: {
    getMovies: async () => {
      try {
        const moviesCache = await redis.get("app:movies");

        if (moviesCache) {
          console.log("dari cache");
          return JSON.parse(moviesCache);
        } else {
          console.log("dari axios");
          const { data: movies } = await axios.get(`${moviesBaseUrl}/movies`);
          await redis.set("app:movies", JSON.stringify(movies));
          return movies;
        }
      } catch (err) {
        console.log(err);
      }
    },
    getMovieById: async (_, args) => {
      try {
        const { id } = args;
        const movieCache = await redis.get(`app:movies:${id}`);
        if (movieCache) {
          console.log("dari cache");
          return JSON.parse(movieCache);
        } else {
          console.log("dari axios");
          const { data: movie } = await axios.get(`${moviesBaseUrl}/movies/${id}`);

          const { data: user } = await axios.get(`${usersBaseUrl}/users/${movie.UserMongoId}`);
          movie.User = user;

          await redis.set(`app:movies:${id}`, JSON.stringify(movie));
          return movie;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    deleteMovie: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(`${moviesBaseUrl}/movies/${id}`);

        const movieCache = await redis.get(`app:movies`);

        if (movieCache) {
          const newMovies = JSON.parse(movieCache).filter((movie) => movie.id != id);
          await redis.set("app:movies", JSON.stringify(newMovies));
        }

        return data.message;
      } catch (err) {
        console.log(err);
      }
    },
    postAddMovie: async (_, args) => {
      try {
        const {
          title,
          synopsis,
          trailerUrl,
          posterImgUrl,
          backdropImgUrl,
          rating,
          genreId,
          cast1Name,
          cast1Character,
          cast1ProfilePict,
          cast2Name,
          cast2Character,
          cast2ProfilePict,
          UserMongoId,
        } = args.newMovie;
        const { data } = await axios.post(`${moviesBaseUrl}/movies`, {
          title,
          synopsis,
          trailerUrl,
          posterImgUrl,
          backdropImgUrl,
          rating,
          genreId,
          cast1Name,
          cast1Character,
          cast1ProfilePict,
          cast2Name,
          cast2Character,
          cast2ProfilePict,
          UserMongoId,
        });
        await redis.del("app:movies");
        return data.message;
      } catch (err) {
        console.log(err);
      }
    },
    putMovie: async (_, args) => {
      try {
        const { id } = args;
        const { title, synopsis, trailerUrl, posterImgUrl, backdropImgUrl, rating, genreId, UserMongoId } =
          args.newMovie;
        const { data } = await axios.put(`${moviesBaseUrl}/movies/${id}`, {
          title,
          synopsis,
          trailerUrl,
          posterImgUrl,
          backdropImgUrl,
          rating,
          genreId,
          UserMongoId,
        });
        await redis.del("app:movies");
        await redis.del(`app:movies:${id}`);
        return data.message;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
