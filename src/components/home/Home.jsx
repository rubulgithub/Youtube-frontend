import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Link to="/user">
        <button>User</button>
      </Link>
    </div>
  );
};

export default Home;
