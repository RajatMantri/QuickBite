const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017/GoFood';

const MongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Database connected to backend");

        const fetched_data = mongoose.connection.db.collection('foodItems');
        const data = await fetched_data.find({}).toArray();

        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        global.items = data;
        global.category = catData;

    } catch (err) {
        console.log('---', err);
    }
}

module.exports = MongoDB;