const express = require("express");
const {connection} = require("./db");
const {userRouter} = require("./routes/User.routes")
const {noteRouter} = require("./routes/Note.routes");
const cors = require('cors')
require("dotenv").config();
const {authenticate} = require("./middlewares/authenticate.middleware")
const app = express();
app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.send("Home Page");
});


app.use("/users",userRouter);
app.use(authenticate);
app.use("/notes",noteRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB");
    } catch (error) {
        console.log(error.message);
    }
    console.log("server running at port 8080");
})