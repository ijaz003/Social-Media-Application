import React, { useState } from 'react';
import { FaThumbsUp, FaRegThumbsUp, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const PostCard = ({ username, timestamp, caption, imageUrl, likes = 0, comments = [],profileImage},...props) => {
  const [likesCount, setLikesCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsList, setCommentsList] = useState(comments);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      setCommentsList([...commentsList, { username: 'currentUser', text: commentText }]);
      setCommentText('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <Link to='/profile'>
        <img
          src={profileImage} // Replace with profile image URL if available
          alt="Profile"
          className="rounded-full h-10 w-10 mr-3"
        />
        </Link>
        <div>
          <Link to='/profile'><h2 className="font-bold text-lg">{username}</h2></Link>
          <span className="text-gray-500 text-sm">{timestamp}</span>
        </div>
      </div>
      <div className="mb-4">
        {imageUrl && (
          <img src={imageUrl} alt="Post" className="rounded-lg max-w-full h-auto" style={{ maxHeight: '400px' }} />
        )}
      </div>
      <div className="mb-4">
        <p>{caption}</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button onClick={handleLike} className={`flex items-center space-x-2 ${isLiked ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 mr-4`}>
            {isLiked ? <FaThumbsUp className="h-5 w-5" /> : <FaRegThumbsUp className="h-5 w-5" />}
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
            <FaComment className="h-5 w-5" />
            <span>Comment</span>
          </button>
        </div>
        <div className="text-gray-500 text-sm">
          <span>{likesCount} Likes</span>
          <span className="ml-4">{commentsList.length} Comments</span>
        </div>
      </div>
      <div className="border-t pt-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border border-gray-300 rounded-lg p-2 mb-2"
        />
        <button
          onClick={handleComment}
          className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors"
        >
          Post
        </button>
        <div className="mt-4">
          {commentsList.map((comment, index) => (
            <div key={index} className="flex items-start mb-2">
              <img
                src="https://via.placeholder.com/150" // Replace with commenter's profile image URL if available
                alt="Profile"
                className="rounded-full h-8 w-8 mr-3"
              />
              <div>
                <span className="font-bold mr-2">{comment.username}</span>
                <span>{comment.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
