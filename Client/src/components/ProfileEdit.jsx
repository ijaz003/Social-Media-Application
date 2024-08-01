import React, { useState } from 'react';
import { FaUpload, FaSave } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import service from '../BackEndServices/confi';

const ProfileEdit = () => {
  const userData=useSelector(state=>state.auth.userData);
  // console.log(userData)
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handlePhotoChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0])
  };


  const handleUpdate = async() => {
    // Handle the update logic here
    try{
      const formData=new FormData();
    formData.append("image",image);
    formData.append("bio",bio);
    formData.append("name",name);
    const token=localStorage.getItem("token");

    await service.updateProfile(formData,token).then(res => {
      if (res.statusText === "OK") {
        alert(res.data.message)
      }
    })
    setImage(null);
    setName("");
    bio("");
    }
    catch(error){
      alert(error.message || error.error)
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
            src={image?URL.createObjectURL(image):userData.profileImage}
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
          onChange={(e)=>setName(e.target.value)}
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
