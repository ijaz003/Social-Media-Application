const chatModel = require("../Models/chatModel");
const userModel=require("../Models/userModel")

const getMessages = async (req, res) => {
    try {
        const { userIds } = req.body;
        const getUserData = await chatModel.findOne({
        users: { $all: userIds }
        });
        // if(!getUserData){
        //     res.status(400).json({message:"No message found "})
        // }
        res.status(200).json(getUserData.messages)
    }
    catch (error) {
        res.status(500).json({message:"Error fetching data from backend"})
    }
}

module.exports = getMessages;