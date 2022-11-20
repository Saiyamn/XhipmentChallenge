import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, Notifications, Search } from "@mui/icons-material";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase";
import { logOut } from "../../state/userSlice";
import "./navbar.scss";

const Navbar = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOut());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <div className="left">
          <h3 className="title">XhipmentSocial</h3>
          <div className="search-section">
            <input type="text" placeholder="Search..." />
            <Search className="search-icon" />
          </div>
        </div>
        <div className="right">
          {userInfo.email === "" ? (
            ""
          ) : (
            <div className="sign-out" onClick={handleSignOut}>
              LogOut
            </div>
          )}

          <Message className="icon" />
          <Notifications className="icon" />
          <img
            src={
              userInfo.email !== "" ? userInfo.photoUrl : "/assets/person.jpeg"
            }
            alt="dp"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
