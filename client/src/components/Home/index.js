import React from "react";
import { userData } from "../../helpers";
import CustomNav from "../CustomNav";

const Home = () => {
  const { username } = userData();

  return (
    <>
      <CustomNav />
      <div className="home">
        <h2>Welcome {username}</h2>
      </div>
    </>
  );
};

export default Home;
