import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://boxflix-mobile-orchestrator.herokuapp.com",
  cache: new InMemoryCache(),
});

export default client;
