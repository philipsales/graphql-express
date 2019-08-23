'use strict';

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = require('./schema'); 
const resolvers = require('./resolver');
const LaunchAPI = require('./datasource/launch');
const MessageAPI = require('./datasource/message');

const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  messageAPI: new MessageAPI()
});

const server = new ApolloServer({ 
    typeDefs, 
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
  ApolloServer,
  LaunchAPI,
  MessageAPI,
  server
}