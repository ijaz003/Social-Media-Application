const Mongoose=require('mongoose');

const schema=Mongoose.Schema({
    imageUrl:String,
    userId:String,
    caption:String,
    name:String
});

module.exports=Mongoose.model("Posts",schema)