const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app =express();
app.use(express.json());
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000

app.get("/", (req,res) =>{
    res.send("Api is running");
});

app.use('/api/user', userRoutes)


app.listen(PORT,console.log(`server started on port ${PORT}`));
