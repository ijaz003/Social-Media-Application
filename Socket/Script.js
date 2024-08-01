const app=require("express")();
const http=require("http").Server(app);
const io= require("socket.io")(http);
const cors=require("cors");
app.use(cors());
const port=7000;

http.listen(port,()=>{
    console.log(`Server Listening Port ${port}`);
})
