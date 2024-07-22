const Mongoose=require('mongoose');

const schema=Mongoose.Schema({
    email: String,
     password: String,
      name: String 
});

module.exports=Mongoose.model('User',schema)