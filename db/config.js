
const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log('Database connection established');
    } catch (error) {
        console.log(error);
        throw new Error('Database connection error: ' + error);
    }

}


module.exports = { dbConnection };