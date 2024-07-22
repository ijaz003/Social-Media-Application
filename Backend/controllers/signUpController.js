const userData=require('../Models/userModel');

const SignupData=async(req,res)=>{
    try{

        const {email}=req.body;
        const checkEmail = await userData.findOne({ email });
        if(checkEmail){
            res.status(400).json({ error: 'Email already exists' })
        }
        else{
            const data=new userData(req.body)
            const result=await data.save()
            res.status(200).json({ message: 'User signed up successfully', user: result });

        }
    }
    catch(error){
        res.status(500).json({error:'server error'});
        console.log(error)
    }
}

module.exports=SignupData;