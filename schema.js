const graphql = require('graphql');
const axios = require('axios');//axios instead of loadash
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema//helper from GQL library, take a root query and returns GQL Schema instance
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});//BookType, not a CompanyType

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString } ,
        age: { type: GraphQLInt },//Integer
        book: {
            type: BookType,
            resolve(parentValue, args) {
                return axios.get(`http:localhost:3000/companies/${parentValue.bookId}`)//axios.get instead of console.log
                    .then(res => res.data);
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data);//responce coming back from axios. to make axios works with graphql
            }
        },
        book: {
            type: BookType, 
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/books/${args.id}`)
                    .then(resp => resp.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
