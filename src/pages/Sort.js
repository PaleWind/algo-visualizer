import React, { useEffect, useRef, useState } from "react";
import "../App.css";

const Sort = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [trace, setTrace] = useState([]);
  const timer = useRef(0);
  let t = [];
  let isPaused = true;

  useEffect(() => {
    resetTrace();
  }, []);

  function resetTrace() {
    setCurrentStep(0);
    setTrace(() => {
      let p = [];
      p.push(generateRandomArray());
      return p;
    });
    t = [];
  }

  function generateRandomArray() {
    let array = [];
    for (let i = 0; i < 20; i++) {
      array.push(Math.floor(Math.random() * 200 - 5 + 1) + 5);
    }
    return array;
  }

  const stepForward = () => {
    setCurrentStep((prev) => {
      return prev < trace.length - 1 ? prev + 1 : prev;
    });
  };

  const play = () => {
    isPaused = !isPaused;
    if (!timer.current) {
      timer.current = setInterval(() => {
        console.log(timer.current);
        stepForward();
      }, 200);
    } else {
      abortTimer(timer.current);
      timer.current = null;
    }
  };

  function stepBackward() {
    setCurrentStep((prev) => {
      return prev > 0 ? prev - 1 : prev;
    });
  }
  function abortTimer() {
    console.log(timer.current);
    clearInterval(timer.current);
  }

  function bubbleSort() {
    let array = trace[trace.length - 1].slice();
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
          //setCurrentStep(t.length - 1);

          console.log(t);
        }
      }
    }
  }

  return (
    <>
      <div className="controls-container">
        <div>controls</div>

        <svg className="control-button"></svg>

        <button
          className="control-button reset-array"
          onClick={() => resetTrace()}
        >
          reset
        </button>

        <button
          className="control-button sort-array"
          onClick={() => bubbleSort()}
        >
          sort
        </button>

        <button
          className="control-button step-back"
          onClick={() => {
            stepBackward();
          }}
        >
          -
        </button>
        <div>{currentStep + 1}</div>
        <button
          className="control-button step-next"
          onClick={() => {
            stepForward();
          }}
        >
          +
        </button>

        <button
          className="control-button step-next"
          onClick={() => {
            play();
          }}
        >
          play
        </button>

        <button
          className="control-button step-next"
          onClick={() => {
            abortTimer();
          }}
        >
          pause
        </button>
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
          {trace.length}
        </div>
      </div>
    </>
  );
};

export default Sort;
