const express = require("express");
const myDb = require("./configs/db.connect");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();


//AUTH
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

myDb.connectDB();

app.listen(8888, () => {
    console.log("server is running on port 8888");
})