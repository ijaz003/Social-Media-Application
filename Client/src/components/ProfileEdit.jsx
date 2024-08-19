import React, { useState, useEffect } from 'react';
import { FaUpload, FaSave } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import service from '../BackEndServices/confi';
import { useNavigate } from 'react-router-dom';
import { ToastSuccess } from './Toasts/Toast';


const ProfileEdit = () => {
  const navigate=useNavigate();
  const userData = useSelector(state => state.auth.userData);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(userData.name || '');
  const [bio, setBio] = useState(userData.bio || '');
  const [visibility,setVisibility]=useState(false);
  useEffect(() => {
    setName(userData.name || '');
    setBio(userData.bio || '');
  }, [userData]);

  const handlePhotoChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("bio", bio);
      formData.append("name", name);
      const token = localStorage.getItem("token");
      const res = await service.updateProfile(formData, token);
      setVisibility(true);
      setTimeout(() => {
        setVisibility(false);
        navigate("/profile")
      }, 3000);
      
      setImage(null);
      setName(userData.name || '');
      setBio(userData.bio || '');
    } catch (error) {
      alert(error.message || error.error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      {visibility?<ToastSuccess message="Profile Update successfully"/>:null}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
            src={image ? URL.createObjectURL(image) : userData.profileImage}
            alt="Profile"
          />
          <label
            htmlFor="photo-upload"
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
          >
            <FaUpload />
            <input
              id="photo-upload"
              type="file"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your bio"
          rows="4"
        />
        <button
          onClick={handleUpdate}
          className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow hover:bg-blue-600 focus:outline-none"
        >
          <FaSave className="inline-block mr-2" /> Update
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
