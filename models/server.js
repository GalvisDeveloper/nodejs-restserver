
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            category: '/api/category',
            product: '/api/product',
            user: '/api/users',
        };

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
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.category, require('../routes/category'))
        this.app.use(this.paths.product, require('../routes/product'))
        this.app.use(this.paths.user, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`The app is running at ${this.port}`);
        });
    }

}

module.exports = Server;