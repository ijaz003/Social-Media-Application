const { Router } = require('express');
const router = Router();
const upload = require('../Middleware/multerMiddelware.js');
const createPostController=require('../controllers/createPostController.js');
const SignupData=require('../controllers/signUpController.js');
const SigninData=require('../controllers/signInController.js');
const post=require('../controllers/postController.js');
const forgotPasword=require("../controllers/forgotPasswordController.js");
const resetPassword=require("../controllers/resetPassword.js");
const ProfileEdit=require("../controllers/ProfileEdit.js");
const uploadProfile=require("../Middleware/updateProfileMiddleware.js");
const getUser=require("../controllers/GetUser.js");

router.route('/createpost').post(upload.single('image'),createPostController);
router.route('/signup').post(SignupData);
router.route('/signin').post(SigninData);
router.route('/forgot-password').post(forgotPasword);
router.route('/post').get(post);
router.route('/reset-password').get(resetPassword.resetPassword);
router.route('/new-password').post(resetPassword.newPassword);
router.route("/profile-edit").post(uploadProfile.single("image"),ProfileEdit)
router.route("/getuser").get(getUser);

module.exports = router;
