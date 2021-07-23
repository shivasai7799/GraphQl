const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');
const _= require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

let books = [
    {name : "Shivasai", genre: "Sci-fi", id: "1", authorId : "1"},
    {name : "kumar", genre: "none", id: "2", authorId : "2"},
    {name : "mechineni", genre: "drama",id: "3", authorId : "3"},
    {name : "mahesh", genre: "none", id: "4", authorId : "1"},
    {name : "Prabhas", genre: "drama", id: "5", authorId : "1"}
]

let authors = [
    {name : "Venkat", age: 23, id: "1"},
    {name : "sai", age: 25, id: "2"},
    {name : "vinay", age: 27, id: "3"}
    
]

const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id : {type: GraphQLID},
        name: {type : GraphQLString},
        genre: {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id: parent.authorId})
            }
        }
    })  
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields : () => ({
     id : {type: GraphQLID},
     name : {type : GraphQLString},
     age : {type : GraphQLInt},
     books : {
         type: new GraphQLList(BookType),
         resolve(parent,args) {
             console.log(parent)
             return _.filter(books,{authorId : parent.id})
         }
        
        }

    })
})

const RootQuery = new GraphQLObjectType ({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : {id:{type: GraphQLID}},
            resolve(parent, args) {
                //Code to get data from db// other source
                console.log(typeof(args.id))
               return _.find(books, {id:args.id})
            }
         },
         author : {
             type : AuthorType,
             args : {id : {type : GraphQLID}},
             resolve(parent, args){
                console.log(typeof(args.id))
                return _.find(authors, {id: args.id})
             }
         }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

