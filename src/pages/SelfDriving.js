import React, { useRef, useEffect, useState } from "react";
import Road from "../Driving/Road";
import Car from "../Driving/Car";
import NeuralNetwork from "../Driving/Network";
import Visualizer from "../Driving/Visualizer";

import "../Styles/App.css";
import "../Styles/SelfDriving.css";

const SelfDriving = () => {
  // let [paused, setPaused] = useState(true);
  const containerRef = useRef(null);
  const carCanvasRef = useRef(null);
  const networkCanvasRef = useRef(null);
  const carCanvasWidth = 200;

  const road = new Road(carCanvasWidth / 2, carCanvasWidth * 0.9);

  const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
    //new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
    //new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
  ];

  const cars = generateCars(100);
  let bestCar = cars[0];
  if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
      cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
      if (i !== 0) {
        NeuralNetwork.mutate(cars[i].brain, 0.2);
      }
    }
  }

  function generateCars(n) {
    let cars = [];
    for (let i = 0; i < n; i++) {
      cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
  }

  function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
  }

  function discard() {
    localStorage.clear("bestBrain");
  }

  function reset() {}

  useEffect(() => {
    const carCanvas = carCanvasRef.current;
    const networkCanvas = networkCanvasRef.current;
    const carCtx = carCanvas.getContext("2d");
    const networkCtx = networkCanvas.getContext("2d");
    let animationFrameId = 0;
    //if (!paused) {
    carCanvas.width = 200;
    networkCanvas.width = 350;

    const animate = () => {
      for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
      }
      for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
      }
      const bestCar = cars.find(
        (car) => car.y === Math.min(...cars.map((c) => c.y))
      );

      carCanvas.height = containerRef.current.clientHeight;
      networkCanvas.height = containerRef.current.clientHeight;

      carCtx.save();
      carCtx.translate(0, -bestCar.y + carCanvas.height * 0.8);

      road.draw(carCtx);
      for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
      }
      carCtx.globalAlpha = 0.2;
      for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");
      }
      carCtx.globalAlpha = 1;
      bestCar.draw(carCtx, "blue", true);
      carCtx.restore();
      animationFrameId = window.requestAnimationFrame(animate);
      Visualizer.drawNetwork(networkCtx, bestCar.brain);
    };
    animate();
    // }
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  });

  return (
    <div className="grid-container">
      <div className="title-container">
        <i id="title">Self Driving Car</i>
      </div>
      <div className="controls-container">
        <button className="control-button" onClick={() => save()}>
          save
        </button>
        <button className="control-button" onClick={() => discard()}>
          clear
        </button>
      </div>

      <div className="self-driving-container" ref={containerRef}>
        {/* <Canvas draw={road.draw}></Canvas> */}
        <canvas id="carCanvas" ref={carCanvasRef}></canvas>
        <canvas id="networkCanvas" ref={networkCanvasRef}></canvas>
      </div>
    </div>
  );
};

export default SelfDriving;
