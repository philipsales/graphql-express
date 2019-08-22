'use strict';

const axios = require('axios');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList,
} = require('graphql');

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString},
        launch_success: { type: GraphQLBoolean},
        rocket: { type: RocketType}
    })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString},
        rocket_name: { type: GraphQLString},
        rocket_type: { type: GraphQLString}
    })
});

// Root QUery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v3/launches')
                    .then(res => res.data);
            }
        },
        launche: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent,args){
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data);
            }
        }
    }
});

module.exports =  new GraphQLSchema({
        query: RootQuery
});