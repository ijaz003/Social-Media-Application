const { Router } = require('express');
const router = Router();
const upload = require('../Middleware/multerMiddelware.js');
const createPostController=require('../controllers/createPostController.js');
const SignupData=require('../controllers/signUpController.js')
const SigninData=require('../controllers/signInController.js')
const post=require('../controllers/postController.js');
const forgotPasword=require("../controllers/forgotPasswordController.js");
const resetPassword=require("../controllers/resetPassword.js")

router.route('/createpost').post(upload.single('image'),createPostController);
router.route('/signup').post(SignupData);
router.route('/signin').post(SigninData);
router.route('/forgot-password').post(forgotPasword);
router.route('/post').get(post);
router.route('/reset-password').get(resetPassword.resetPassword);
router.route('/new-password').post(resetPassword.newPassword);

module.exports = router;
