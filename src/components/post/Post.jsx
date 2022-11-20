import { Delete, Edit, Send } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

import "./post.scss";
import { db } from "../../firebase";
const Post = ({ post, index, posts, setPosts }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isEdit, setIsEdit] = useState(false);
  const newContent = useRef();

  const editHandler = () => {
    setIsEdit(true);
  };

  const updatePostHandler = () => {
    // get the edited data from input using useref
    const content = newContent.current.value;
    const postId = post.postId;

    // using the post id , update the firestore
    const docRef = doc(db, "posts", postId);

    const data = {
      content: content,
    };

    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        posts[index].content = content;
        setIsEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHandler = () => {
    const postId = post.postId;

    const docRef = doc(db, "posts", postId);

    deleteDoc(docRef)
      .then(() => {
        let newPosts = [...posts];
        newPosts.splice(index, index);
        setPosts(newPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PostContent = () => {
    if (userInfo.email !== "") {
      if (!isEdit) {
        return <p>{post.content}</p>;
      } else {
        return (
          <div>
            <input type="text" ref={newContent} />
            <button onClick={updatePostHandler}>
              <Send />
            </button>
          </div>
        );
      }
    } else {
      return <p>{post.content}</p>;
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="author-details">
          <img src={post.photoUrl} alt="" />
          <span>{post.name}</span>
        </div>
        {userInfo.email !== "" && userInfo.email === post.userId ? (
          <div className="edit-delete-section">
            <Edit className="edit-icon" onClick={editHandler} />
            <Delete className="delete-icon" onClick={deleteHandler} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="post-content">
        <PostContent />
      </div>
    </div>
  );
};

export default Post;
