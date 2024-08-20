const userModel=require("../Models/userModel");

const getAllUsers=async(req,res)=>{
    try{
        const allUsers=await userModel.find({});
        res.status(200).json(allUsers);
    }
    catch(error)
    {
        res.status(500).json({message:"error in loading the post"})
    }
}
module.exports=getAllUsers;