const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log(process.env.MONGODB_CNN)
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('database conected successfully');
    } catch (error) {
        console.log(error);
        throw new Error('error to connect to DB');
    }
}

module.exports = { dbConnection };