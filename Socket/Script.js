const { Server, Socket } = require("socket.io");
const port = 4000;
const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    }
})

let onlineUsers = [];
const addUser = (userId, socketId) => {
    const userExist = onlineUsers.find(data => data.userId == userId);
    if (!userExist) {
        onlineUsers.push({ userId, socketId })
    }
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(data => data.socketId !== socketId);
}

const findUser = (recieverId) => {
    return onlineUsers.find(data => data.userId == recieverId);
}

io.on("connection", (socket) => {
    socket.on("addUser", (data) => {
        addUser(data, socket.id);
        // console.log(onlineUsers)
        
    })
    socket.on("sendMessage", (receiver) => { // Corrected event name
        const user = findUser(receiver.receiverId); // Corrected spelling of receiverId
        console.log(user);
        if(user){
            io.to(user.socketId).emit("getMessage",{
                text:receiver.text,
                senderId:receiver.senderId

            })
        }
        
    })

    socket.on("removeUser", (data) => {
        removeUser(socket.id);
    })


    socket.on("disconnect", () => {
        removeUser(socket.id)
    })
})


io.listen(port, () => {
    console.log(`Listening Port is ${port}`);
})