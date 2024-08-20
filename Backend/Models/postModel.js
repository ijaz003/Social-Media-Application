const Mongoose=require('mongoose');

const schema=Mongoose.Schema({
    imageUrl:String,
    userId:String,
    caption:String,
    name:String,
    comment:Object,
    like:Number,
    profileImage: {
        type: String,
        default: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png',
      },

});

module.exports=Mongoose.model("Posts",schema)