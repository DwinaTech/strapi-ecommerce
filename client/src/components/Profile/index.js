import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import UpoloadAvatar from "./UploadAvatar";

const Profile = ({ token }) => {
  const [user, setUser] = useState({});
  const [isUserUpdated, setisUserUpdated] = useState(false);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:1337/api/users/me`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUser(data);
        setisUserUpdated(false);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, [token, isUserUpdated]);

  return (
    <div className="profile">
      <div className="avatar">
        <div className="avatar-wrapper">
          {user.avatarUrl ? (
            <img
              src={`http://localhost:1337${user.avatarUrl}`}
              alt={`${user.username} avatar`}
            />
          ) : (
            <IoPersonCircleOutline />
          )}
          <UpoloadAvatar
            token={token}
            userId={user.id}
            username={user.username}
            avatarUrl={user.avatarUrl}
            setisUserUpdated={setisUserUpdated}
          />
        </div>
      </div>
      <div className="body">
        <p>Name: Ali</p>
        <p>Email: Email@gmail.com</p>
        <p>Account created at: 01/01/2023</p>
      </div>
    </div>
  );
};

export default Profile;
