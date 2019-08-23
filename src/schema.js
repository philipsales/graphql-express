const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    hello: String 
    launch(id: ID!): Launch
    messages: [Message] 
  }

  type Launch {
    id: ID!
    site: String
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type Message {
    messageCode: String
    content: String
    lang: String
    channelType: String
  }

  type Resident {
    First_Name: String
    Last_Name: String
  }

  
`;

module.exports = typeDefs;
