import {
  LinkedIn,
  PlaceOutlined,
  Twitter,
  WorkOutline,
} from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";

import "./userinfo.scss";
const UserInfo = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <div className="userinfo">
      <div className="name-section">
        <img
          src={
            userInfo.email !== "" ? userInfo.photoUrl : "/assets/person.jpeg"
          }
          alt="user"
        />
        <span className="name">
          {userInfo.email !== "" ? userInfo.name : "Mihaela"}
        </span>
      </div>
      <div className="background-section">
        <div className="location">
          <PlaceOutlined />
          <span>
            {userInfo.email !== "" ? "Add your location" : "Chicago,USA"}
          </span>
        </div>
        <div className="work">
          <WorkOutline />
          <span>
            {userInfo.email !== ""
              ? "Add your work status"
              : "Manager at Tim Hortons"}
          </span>
        </div>
      </div>
      <div className="social-section">
        <p>Follow me on</p>
        <div className="social">
          <Twitter />
          <span>Twitter</span>
        </div>
        <div className="social">
          <LinkedIn />
          <span>Linkedin</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
