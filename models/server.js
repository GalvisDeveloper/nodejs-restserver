
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // Db connection
        this.connectionDb();

        // Middlewares 
        this.middlewares();

        // Routes
        this.routes();

    }

    async connectionDb() {
        await dbConnection();
    }

    middlewares() {
        // CORS 
        this.app.use(cors())

        // Read and parse the body data
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usersPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`The app is running at ${this.port}`);
        });
    }

}

module.exports = Server;