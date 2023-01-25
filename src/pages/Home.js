import React from "react";
import "../App.css";

const Home = () => {
  return (
    <>
      <div className="controls-container">
        <i id="title">Algorithm Visualizer</i>
      </div>
      <div className="info-container">
        <h4 className="info-text">
          Hello, this is a small project that I decided to undertake in order to
          learn more about React and algorithms. It includes visualizers for
          sorting and graph traversing algorithms.{" "}
        </h4>
      </div>
      <div className="visualizer-container"></div>
    </>
  );
};

export default Home;
