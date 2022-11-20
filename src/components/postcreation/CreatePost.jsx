import {
  AddReactionOutlined,
  ImageOutlined,
  KeyboardVoiceOutlined,
  VideoCameraBackOutlined,
} from "@mui/icons-material";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";

import "./createpost.scss";
import { db } from "../../firebase";

const CreatePost = ({ posts, setPosts }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const postData = useRef();

  const createPostHandler = () => {
    // Read the data from the postData
    const content = postData.current.value;

    // get the current logged in user's detail like name, email and photoID

    const name = userInfo.name;
    const userId = userInfo.email;
    const photoUrl = userInfo.photoUrl;

    // Now add the post to the firestore

    const post = {
      name: name,
      userId: userId,
      photoUrl: photoUrl,
      content: content,
    };

    const addData = async () => {
      try {
        const docRef = await addDoc(collection(db, "posts"), post);
        const postWithId = { postId: docRef.id, ...post };
        let updatedPosts = [...posts];
        updatedPosts.push(postWithId);
        setPosts(updatedPosts);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    addData();
  };

  return (
    <div className="createpost">
      <div className="header">
        <img
          src={
            userInfo.email !== "" ? userInfo.photoUrl : "/assets/person.jpeg"
          }
          alt="user"
        />
        <input
          className="text-content"
          placeholder="Share whats on your mind"
          ref={postData}
        />
      </div>
      <div className="footer">
        <div className="icon-container">
          <ImageOutlined className="icon" />
          <span>Image</span>
        </div>
        <div className="icon-container">
          <VideoCameraBackOutlined className="icon" />
          <span>Video</span>
        </div>
        <div className="icon-container">
          <AddReactionOutlined className="icon" />
          <span>Emotions</span>
        </div>
        <div className="icon-container">
          <KeyboardVoiceOutlined className="icon" />
          <span>Audio</span>
        </div>
        <div className="post-btn" onClick={createPostHandler}>
          POST
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
