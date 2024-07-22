const userData=require('../Models/userModel');
const jwt = require('jsonwebtoken');

const signinData = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const dbData = await userData.findOne({ email });
        
        if (!dbData) {
            return res.status(404).send({error:"User not found"});
        }

        if (password === dbData.password) {
            const token = jwt.sign({ userId: dbData._id }, process.env.JWT_SECRET_KEY);
            // console.log(process.env.JWT_SECRET_KEY)
            res.status(200).json({ token: token,userData:dbData });
        } else {
            res.status(401).send({message:"Invalid password"});
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({error:"Internal Server Error"});
    }
};

module.exports=signinData;