const express = require('express');
// const db = require('./config/db');
const schema = require('./schema');
const {graphqlHTTP} = require('express-graphql');

const app = express();

// app.use(express.json());

// db.connect();

// app.use('/user', require('./routes/user'));
// app.use('/products', require('./routes/product'));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  pretty: true,
  graphiql: true
}))

app.listen(5000, () => {
  console.log('listening on port 5000');
});
