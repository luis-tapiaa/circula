require('dotenv').config();
const { ApolloServer } = require("apollo-server");
const { db, getFields, update } = require("./pgAdaptor");

const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { db, getFields, update };
  },
});

server.listen({ port: process.env.PORT || 3000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
