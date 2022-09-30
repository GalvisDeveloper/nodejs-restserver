require('dotenv').config();
const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hola Mundo')
});

app.listen(port, () => {
    console.log(`The app is runing on port ${port}`)
});