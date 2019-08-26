'use strict';
require('./server/config/config');

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./server/schema'); 
const resolvers = require('./server/resolver');

const LaunchAPI = require('./datasource/launch/launch');
const MessageAPI = require('./datasource/message/message');
const ResidentAPI = require('./datasource/resident/resident');

const log = require('./server/lib/logger/logger');
const logger = log.logger.child({ sourceFile: log.file.setFilename(__filename) });

const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  messageAPI: new MessageAPI(),
  residentAPI: new ResidentAPI()
});

const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};

const server = new ApolloServer({ 
    typeDefs, 
    dataSources,
    resolvers,
    tracing: true,
    cacheControl: false,
    engine: {
      apiKey: process.env.APOLLO_ENGINE_KEY,
    },
});

if (process.env.NODE_ENV !== 'test'){
  server.listen({ port: 4001 }).then(({ url }) => {
    logger.info('🚀 initialize server');
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