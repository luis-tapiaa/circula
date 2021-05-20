require("dotenv").config();
const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,  
  playground: true,
  introspection: true
});

server.listen({ port: process.env.PORT || 3000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
