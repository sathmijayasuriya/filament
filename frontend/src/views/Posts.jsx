import React from 'react';
import Logo from "@/assets/logo.png";
import PostHeader from '../components/posts/PostHeader';
import PostsTable from '../components/posts/PostsTable';

const Posts = () => {
  return (
    <div className="m-1 mx-40"> 
      <PostHeader/>
      <PostsTable/>
    </div>
  );
};

export default Posts;