const express = require("express");

const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const adminRoutes = require("./routes/admin");
const roomRoutes = require("./routes/room");
const bookingRoutes=require("./routes/booking");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const connectDB = require("./db/connect");
require("dotenv").config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/booking",bookingRoutes)

const port = 8000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server started on ${port}...)`));
    } catch (error) {
        console.log(error);
    }
};

start();
