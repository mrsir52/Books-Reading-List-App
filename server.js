const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', expressGraphQL({
    schema, //schema: schema,
    graphiql: true
}));

app.listen(4001,() => {
    console.log('Listening'); 
});
