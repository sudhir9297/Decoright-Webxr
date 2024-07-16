import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <Link to="/product">Product Page</Link>
    </>
  );
};

export default HomePage;
