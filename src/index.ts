import express from 'express';
const app = express();

import user from "./routes/router";

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/", user);

app.listen(3000, ()=>{
    console.log("server is running")
})