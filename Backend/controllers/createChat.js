const chatModel = require("../Models/chatModel");

const createChat = async (req, res) => {
    try {
        const { userIds, content, senderId } = req.body;

        const userExist = await chatModel.findOne({
            users: { $all: userIds }
        });

        if (!userExist) {
            const createChat = new chatModel({
                users: userIds,
                messages: [{
                    sender: senderId,
                    content
                }],
                lastMessage: {
                    sender: senderId,
                    content
                }
            });

            await createChat.save();
            res.status(200).json(createChat);
        } else {
            const userMessage = userExist.messages
            userMessage.push({
                sender: senderId,
                content
            })
            userExist.lastMessage = { sender: senderId, content }
            await userExist.save()

            res.status(200).json(userMessage);
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to create Chat!", error });
    }
};

module.exports = createChat;
