const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

async function Server() {
    const app = express();
    const apServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apServer.start();
    apServer.applyMiddleware({ app });

    mongoose.set('strictQuery', true);
    await mongoose.connect("mongodb+srv://mustafaismailmab:mumu123@cluster0.kmefq4m.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority");
    console.log('Update: Database is connected to the project.');

    const port = process.env.PORT || 8000;
    app.listen(port, () =>
        console.log(`Server is running on http://localhost:${port}/graphql`)
    );
}

Server();
