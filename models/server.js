const express = require('express');
const cors = require('cors');
const { databaseConnection } = require('../database/config');
const userRouter = require('../routes/users.router');



class Server{

    userPath = '/api/v1/users';

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 9000;

        // DB
        this.database();

        // middleware
        this.middlewares();

        this.routes();
    }

    // Connect to DB_DATABASE
    async database(){
        await databaseConnection();
    }

    // Routes
    routes(){
        this.app.use( this.userPath , userRouter );
    }

    // Middlewares
    middlewares(){
        // Using CORS middleware
        this.app.use( cors() );

        // JSON Parsing
        this.app.use( express.json() );

        this.app.use( express.static( 'public' ) );
    }

    // listen
    listen() {
        this.app.listen( this.PORT, () => {
            console.log('listening on port ' + this.PORT );
        } );
    }
}

module.exports = Server;