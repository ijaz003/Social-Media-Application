const Mongoose=require('mongoose');

const schema=Mongoose.Schema({
    imageUrl:String,
    userId:String,
    caption:String,
    name:String,
    comment:Object,
    like:Number,

});

module.exports=Mongoose.model("Posts",schema)