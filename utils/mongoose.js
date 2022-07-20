const mongoose = require('mongoose');
require('dotenv').config();
module.exports = {
    init: () => {
        const dbOptions = {
            maxPoolSize: 50, 
            wtimeoutMS: 2500,
            useNewUrlParser: true
        }

        mongoose.connect(process.env.MongooseURI, dbOptions).then(() => {
            console.log('Connected to MongoDB');
        }).catch(err => {
            console.error('Error connecting to MongoDB', err);
            console.log("Stopping process to prevent data loss");
            process.exit(1);
        })
        mongoose.Promise = global.Promise;

       

        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error: \n${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose connection lost');
        });
    }
}
