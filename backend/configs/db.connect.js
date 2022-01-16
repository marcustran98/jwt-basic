const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
async function connectDB() {
    try {
        const data = await mongoose.connect(process.env.MONGOOSE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("connect sucess");
    } catch (err) {
        console.log('err', err);
    }
}
module.exports = {
    connectDB
}