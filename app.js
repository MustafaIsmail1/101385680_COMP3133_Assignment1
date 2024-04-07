const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./typeDefs'); // Ensure correct import syntax
const { resolvers } = require('./resolvers'); // Ensure correct import syntax
const mongoose = require('mongoose');

// Apollo server
async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    mongoose.set('strict', true); 
    try {
        await mongoose.connect('mongodb+srv://mustafaismailmab:mumu123@cluster0.kmefq4m.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority');
        console.log('Update: Database is connected to the project.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        // Ensure proper error handling for database connection
        process.exit(1); // Exit the process if unable to connect to the database
    }
    
    const port = process.env.PORT || 3000; // Use process.env.PORT if available
    app.listen(port, () => console.log(`Server is up at port ${port}/graphql`));
}

startServer();
