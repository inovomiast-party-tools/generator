const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { MONGODB_URI } = process.env;

module.exports.connectDB = async function connectDB() {
    if (!process.env.MONGODB_URI) {
        throw new Error('Mongo URI not found!');
    }
    else
    {
        try {
            if (mongoose.connection.readyState === 0) {
                await mongoose.connect(MONGODB_URI);

                mongoose.connection.on('error', (err) => {
                    console.log(`MongoDB connection error: ${err}`);
                    return 1;
                });

                mongoose.connection.on('open', () => {
                    console.log('MongoDB connected');
                });

                mongoose.connection.on("disconnected", () => {
                    console.log("MongoDB disconnected.");
                  });            
            }
        } catch (error) {
            console.error(error);
            return error;        
        }
    }
}