import React from "react";
import "../Styles/App.css";

const Home = () => {
  return (
    <div className="grid-container">
      <div className="title-container">
        <i id="title">Algorithm Visualizer</i>
      </div>
      <div className="home-container">
        <h4 className="info-text">
          Hello, this is a small project that I decided to undertake in order to
          learn more about React and algorithms. It includes visualizers for
          sorting and graph traversing algorithms as well as an AI project.{" "}
        </h4>
        <div className="info-text">
          <i>Want to buy a light? Contact Us from the shop!</i>
        </div>
      </div>
    </div>
  );
};

export default Home;
