const mongoose = require('mongoose');
const config = require("../config.json");

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(config.mongoURL, dbOptions);

        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log("Connected to the database");
        });

        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error: \n${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn("Connection to the database was lost");
        });
    }
}
