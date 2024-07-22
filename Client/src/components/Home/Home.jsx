import React, { useState, useEffect } from 'react';
import PostCard from "../PostCard/PostCard";
import service from '../../BackEndServices/confi';


const Home = () => {
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.allPost();
        setAllPost(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <>
      {
        allPost.map((post) => (
          <PostCard
            key={post._id}  // Ensure each item in the list has a unique key
            username={post.name}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))
      }
    </>
  );
};

export default Home;
