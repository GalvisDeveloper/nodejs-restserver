
const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares 
        this.middlewares();

        // Routes
        this.routes();
    }

    middlewares() {
        // Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.status(201).json({ msg: 'GET API' });
        });

        this.app.put('/api', (req, res) => {
            res.json({ msg: 'PUT API' });
        });

        this.app.post('/api', (req, res) => {
            res.json({ msg: 'POST API' });
        });

        this.app.delete('/api', (req, res) => {
            res.json({ msg: 'DELETE API' });
        });

        this.app.patch('/api', (req, res) => {
            res.json({ msg: 'PATCH API' });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`The app is running at ${this.port}`);
        });
    }

}

module.exports = Server;