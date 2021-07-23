const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');
const _= require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

let books = [
    {name : "Shivasai", genre: "Sci-fi", id: "1"},
    {name : "kumar", genre: "none", id: "2"},
    {name : "mechineni", genre: "drama", id: "3"}
]

const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id : {type: GraphQLString},
        name: {type : GraphQLString},
        genre: {type : GraphQLString}
    })  
});

const RootQuery = new GraphQLObjectType ({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : {id:{type: GraphQLString}},
            resolve(parent, args) {
                //Code to get data from db// other source
               return _.find(books, {id:args.id})
            }
         }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

