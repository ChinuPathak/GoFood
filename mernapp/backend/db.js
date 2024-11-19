const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/goFood'

async function connectDB() {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
        const fetched_data = await mongoose.connection.db.collection("food_items")
        const data = await fetched_data.find({}).toArray()
        global.food_items = data
        const foodCategory = await mongoose.connection.db.collection("foodCategory")
        const foodCategoryData = await foodCategory.find({}).toArray()
        global.foodCategory = foodCategoryData
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

module.exports = connectDB