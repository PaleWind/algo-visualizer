import React, { useEffect, useState } from "react";
import "../Styles/App.css";
import "../Styles/Sort.css";

const Sort = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [trace, setTrace] = useState([]);
  const [isPaused, setPaused] = useState(true);

  const [speed, setSpeed] = useState(200);
  const sliderMax = 200;
  let t = [];

  useEffect(() => {
    resetTrace();
  }, []);
  useEffect(() => {}, [speed]);

  useEffect(() => {
    let time = 0;
    if (!isPaused) {
      time = setInterval(() => {
        setCurrentStep((prev) => {
          return prev < trace.length - 1 ? prev + 1 : prev;
        });
      }, 201 - speed);
    }
    return () => {
      clearInterval(time);
    };
  }, [isPaused]);

  function resetTrace() {
    setPaused((prev) => true);
    setCurrentStep(0);
    setTrace(() => {
      let p = [];
      p.push(generateRandomArray());
      return p;
    });
    t = [];
    bubbleSort(generateRandomArray());
  }

  function generateRandomArray() {
    let array = [];
    for (let i = 0; i < 30; i++) {
      array.push(Math.floor(Math.random() * 200 - 5 + 1) + 5);
    }
    return array;
  }

  const stepForward = () => {
    if (!isPaused) {
      setPaused(() => true);
      return;
    }
    setCurrentStep((prev) => {
      return prev < trace.length - 1 ? prev + 1 : prev;
    });
  };

  function stepBackward() {
    if (!isPaused) {
      setPaused(() => true);
      return;
    }
    setCurrentStep((prev) => {
      return prev > 0 ? prev - 1 : prev;
    });
  }

  function bubbleSort(array) {
    //let array = trace[trace.length - 1].slice();
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          t.push([...array]);
          setTrace(() => {
            return t;
          });
        }
      }
    }
  }

  return (
    <div className="grid-container">
      <div className="title-container">
        <i id="title">Sorting Visualizer</i>
      </div>
      <div className="controls-container">
        <button
          className="control-button reset-array"
          onClick={() => resetTrace()}
        >
          reset
        </button>
        <button
          className="control-button step-back"
          onClick={() => {
            stepBackward();
          }}
        >
          -
        </button>
        <button
          className="control-button play"
          onClick={() => {
            setPaused((prev) => !prev);
          }}
        >
          {isPaused ? "play" : "pause"}
        </button>
        <button
          className="control-button step-next"
          onClick={() => {
            stepForward();
          }}
        >
          +
        </button>
        <input
          className="slider-input"
          type="range"
          min="1"
          max={sliderMax}
          onChange={(e) => {
            setSpeed(() => e.target.value);
          }}
          value={speed}
        />
      </div>
      <div className="visualizer-container">
        <div className="sort-grid">
          {trace.length
            ? trace[currentStep].map((v, i) => {
                return (
                  <div
                    className="sort-grid-bar"
                    key={i}
                    style={{ height: `${v}px` }}
                  ></div>
                );
              })
            : "empty"}
        </div>
      </div>
      <p className="info-container">
        Step: {currentStep + 1} / {trace.length}
      </p>
    </div>
  );
};

export default Sort;
