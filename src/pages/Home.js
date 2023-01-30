import React from "react";
import "../Styles/App.css";

const Home = () => {
  return (
    <div className="grid-container">
      <div className="title-container">
        <i id="title">Algorithm Visualizer</i>
      </div>
      <div className="controls-container">
        <h4 className="info-text">
          Hello, this is a small project that I decided to undertake in order to
          learn more about React and algorithms. It includes visualizers for
          sorting and graph traversing algorithms and was a bit rushed.{" "}
        </h4>
      </div>
      <div className="visualizer-container"></div>
    </div>
  );
};

export default Home;
