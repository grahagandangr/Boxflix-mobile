const { ApolloServer, gql } = require("apollo-server");
const userSchema = require("./schema/userSchema");
const genreSchema = require("./schema/genreSchema");
const movieSchema = require("./schema/movieSchema");

const server = new ApolloServer({
  typeDefs: [userSchema.typeDefs, genreSchema.typeDefs, movieSchema.typeDefs],
  resolvers: [userSchema.resolvers, genreSchema.resolvers, movieSchema.resolvers],
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
