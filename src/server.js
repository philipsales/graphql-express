'use strict';

const { ApolloServer, gql } = require('apollo-server')
const typeDefs = require('./schema'); 
const couchbase = require('couchbase');

console.log('foo');
var cluster = new couchbase.Cluster("couchbase://139.162.49.49:8091");

/*
var bucket = cluster.openBucket("awhcurisdb");
var statement = "SELECT META().id, awhcurisdb.answers.* FROM awhcurisdb limit 10";
*/

//cluster.authenticate("superman", "kryptonite");
//cluster.authenticate("curisAdminUser", "adm(1)mwh")
cluster.authenticate("", "Awhp1idb")
var bucket = cluster.openBucket("awhpiidb");
var statement = "SELECT META().id, awhpiidb.answers.* FROM awhpiidb limit 2";

//cluster.authenticate("superman", "kryptonite");
//var bucket = cluster.openBucket("awhcurisdb");
var query = couchbase.N1qlQuery.fromString(statement);

function residentReducer(answers) {
  return {
    First_Name: answers.First_Name,
    Gender: answers.Gender,
    Last_Name: answers.Last_Name,
    Middle_Name: answers.Middle_Name 
  }
}

bucket.query(query, (err, response) => {
    if (err) {
        console.log(err);
    }
    var result = Array.isArray(response) ? response.map(answer => residentReducer(answer)) : [];
    console.log(result);
})


const server = new ApolloServer({ 
  typeDefs, 
  tracing: true,
  cacheControl: false,
  engine: {
    apiKey: 'ENGINE_API_KEY=service:awh-notifications:AaQg0qq5n8DbaGVNuX1iAQ',
  },
});

if (process.env.NODE_ENV !== 'test'){
  server.listen({ port: 4002 }).then(({ url }) => {
    console.log(`🚀 app running at ${url}`);
  });
}

module.exports = { }