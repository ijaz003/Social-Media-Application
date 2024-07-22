const userModel=require("../Models/userModel");

const resetPassword = (req, res) => {
    try {
        const email=req.query.email;
        res.redirect(`/index.html?email=${email}`);
    } catch (error) {
        console.error("Error redirecting:", error);
    }
}

const newPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        user.password = password;
        await user.save();

        res.status(200).json({ data: "Password reset successful." });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports={resetPassword,newPassword}