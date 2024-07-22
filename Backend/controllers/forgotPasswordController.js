const nodemailer = require('nodemailer');
const userModel=require("../Models/userModel")

const forgotPaswordController = async (req, res) => {
   try{
    const { email } = req.body;
    const userData=await userModel.findOne({email:email});
    if(!userData){
        res.status(400).json({message:"user Not find"})
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_EMIAL,
            pass: process.env.PASS
        }
    })

    const mailOptions = {
        from: process.env.USER_EMIAL,
        to: email,
        subject: "Email Forget Request",
        html:`<a href="http://localhost:${process.env.PORT}/reset-password/?email=${email}">http://localhost:5000/reset-password</a>`
    }

    const sendMail = async (transporter, mailOptions) => {
        try {
            await transporter.sendMail(mailOptions)
            res.status(200).json({ message: 'Email sent successfully' });
        }
        catch (error) {
            console.log(error)
            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
    sendMail(transporter, mailOptions)
   }
   catch(error){
    return res.status(500).send({ error: "Internal Server Error" });
   }
}



module.exports = forgotPaswordController;