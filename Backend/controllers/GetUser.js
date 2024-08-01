const jwt=require('jsonwebtoken');
const userModel=require("../Models/userModel")

const GetUser = async(req, res) => {
    const token = JSON.parse(req.headers["authorization"]);
    const userId=jwt.verify(token.token,process.env.JWT_SECRET_KEY)
    const userData=await userModel.findOne({_id:userId.userId});
    res.send(userData)

};

module.exports = GetUser;
