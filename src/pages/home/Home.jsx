import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import CreatePost from "../../components/postcreation/CreatePost";
import Post from "../../components/post/Post";

import UserInfo from "../../components/userinfo/UserInfo";
import { auth, db } from "../../firebase";
import { startSignIn, signInSuccessful } from "../../state/userSlice";

const Home = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    const getData = async () => {
      let fetchedPost = [];
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        const post = { postId: doc.id, ...doc.data() };
        fetchedPost.push(post);
      });

      setPosts(fetchedPost);
    };

    getData();
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleSignIn = () => {
    dispatch(startSignIn());
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        dispatch(
          signInSuccessful({
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="home">
      <Navbar></Navbar>
      <div className="home-contents">
        <div className="home-contents-wrapper">
          <div className="user-details-section">
            <UserInfo />
          </div>
          <div className="post-section">
            {userInfo.email !== "" ? (
              <CreatePost posts={posts} setPosts={setPosts} />
            ) : (
              <div className="sign-in-container">
                <p>Sign In to share your thoughts with the world</p>
                <div onClick={handleSignIn}>Get Started</div>
              </div>
            )}
            <div className="posts">
              {posts.map((post, i) => (
                <Post post={post} index={i} posts={posts} setPosts={setPosts} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
