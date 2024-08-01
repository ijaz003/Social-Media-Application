const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  profileImage: {
    type: String,
    default: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png',
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500, // Setting a max length for the bio
    default:"Create Your Bio"
  },
}, {
  timestamps: true, // Automatically includes createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
