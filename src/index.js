'use strict';
//const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const { ApolloServer, 
  addSchemaLevelResolveFunction,
  makeExecutableSchema } = require('apollo-server');

const typeDefs = require('./schema'); 
const resolvers = require('./resolver');
const LaunchAPI = require('./datasource/launch');
const MessageAPI = require('./datasource/message');
const ResidentAPI = require('./datasource/resident');

const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  messageAPI: new MessageAPI(),
  residentAPI: new ResidentAPI()
});

const logger = { log: e => console.log(e) }

//const schema = makeExecutableSchema({ typeDefs });
/*
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger
});
*/

const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};

// addSchemaLevelResolveFunction(schema, rootResolveFunction)

const server = new ApolloServer({ 
    typeDefs, 
    //schema,
    dataSources,
    resolvers,
    tracing: true,
    cacheControl: false,
    engine: {
      apiKey: 'ENGINE_API_KEY=service:awh-notifications:AaQg0qq5n8DbaGVNuX1iAQ',
    },
});

if (process.env.NODE_ENV !== 'test'){
  server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`🚀 app running at ${url}`);
  });
}

module.exports = { 
  dataSources,
  typeDefs,
  resolvers,
  LaunchAPI,
  MessageAPI,
  ResidentAPI 
}