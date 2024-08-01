import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import service from '../../BackEndServices/confi';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await service.getUserData(token);
        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  const profileEditHandle = () => {
    navigate("/profile-edit");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 h-40">
        <button onClick={profileEditHandle} className="absolute top-4 right-4 bg-white text-blue-700 font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-200 focus:outline-none">
          <FaEdit className="inline-block mr-2" /> Edit
        </button>
      </div>
      <div className="relative flex justify-center -mt-20 z-10">
        <img
          className="w-40 h-40 object-cover rounded-full border-4 border-white"
          src={userData?.profileImage || 'default-profile.png'}
          alt="Profile"
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-3xl font-semibold text-gray-800">{userData?.name || 'Loading...'}</h2>
        <div className="flex justify-center mt-4 space-x-8">
          <div className="text-center">
            <p className="font-bold text-gray-700 text-2xl">{userData?.postsCount || 0}</p>
            <p className="text-gray-400">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-700 text-2xl">{userData?.followersCount || 0}</p>
            <p className="text-gray-400">Followers</p>
          </div>
        </div>
        <p className="text-center text-gray-700 px-8 mt-4">
          {userData?.bio || 'No bio available'}
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <a href={userData?.linkedin || '#'} className="text-gray-500 hover:text-gray-900 text-2xl"><FaLinkedin /></a>
          <a href={userData?.instagram || '#'} className="text-gray-500 hover:text-gray-900 text-2xl"><FaInstagram /></a>
          <a href={userData?.twitter || '#'} className="text-gray-500 hover:text-gray-900 text-2xl"><FaTwitter /></a>
          <a href={userData?.youtube || '#'} className="text-gray-500 hover:text-gray-900 text-2xl"><FaYoutube /></a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
