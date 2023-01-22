import React, { useEffect, useRef, useState } from "react";
import "../App.css";

const Sort = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [trace, setTrace] = useState([]);
  const [colorTrace, setColorTrace] = useState([]);
  const timer = useRef(0);
  let t = [];
  let isPaused = true;

  useEffect(() => {
    resetTrace();
  }, []);

  function resetTrace() {
    pause();
    setCurrentStep(0);
    setTrace(() => {
      let p = [];
      p.push(generateRandomArray());
      return p;
    });
    // setColorTrace(() => {
    //   let p = [];
    //   p.push(generateRandomColorArray());
    //   return p;
    // });
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

  function generateRandomColorArray() {
    let array = [];
    for (let i = 0; i < 20; i++) {
      array.push([0, Math.floor(Math.random() * 200 - 5 + 1) + 5]);
    }
    return array;
  }

  const stepForward = () => {
    setCurrentStep((prev) => {
      return prev < trace.length - 1 ? prev + 1 : prev;
    });
  };

  function stepBackward() {
    pause();
    setCurrentStep((prev) => {
      return prev > 0 ? prev - 1 : prev;
    });
  }
  const play = () => {
    isPaused = !isPaused;
    console.log(isPaused);
    if (!timer.current) {
      timer.current = setInterval(() => {
        stepForward();
      }, 100);
    } else {
      pause(timer.current);
      timer.current = null;
    }
  };

  function pause() {
    clearInterval(timer.current);
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

  function bubbleSortColor() {
    let array = colorTrace[colorTrace.length - 1].slice();
    let tr = [];
    // console.log(array);
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j][1] > array[j + 1][1]) {
          // console.log(array[j][1] + " " + array[j + 1][1]);
          let temp = array[j][1];
          array[j][1] = array[j + 1][1];
          array[j + 1][1] = temp;
          tr.push([...array]);
          //setCurrentStep(t.length - 1);
        }
      }
    }
    setColorTrace(() => {
      return tr;
    });
  }

  function mergeSort(array) {
    if (array.length <= 1) return array;
    let mid = Math.floor(array.length / 2);

    let left = mergeSort(array.slice(0, mid));
    let right = mergeSort(array.slice(mid));

    return merge(left, right);
  }

  function merge(left, right) {
    let sortedArr = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        sortedArr.push(left.shift());
      } else {
        sortedArr.push(right.shift());
      }
    }
    t.push([...sortedArr, ...left, ...right]);
    console.log(t);
    // setTrace(() => {
    //   return [...sortedArr, ...left, ...right];
    // });
    return [...sortedArr, ...left, ...right];
  }

  return (
    <>
      <div className="controls-container">
        <div>controls</div>

        {/* <svg className="control-button"></svg> */}

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
          {isPaused ? "play" : "pause"}
        </button>
        <p className="steps-counter">
          Step: {currentStep + 1} / {trace.length}
        </p>
        {/* 
        <button
          className="control-button sort-array"
          onClick={() => {
            let arr = mergeSort(trace[trace.length - 1].slice());
          }}
        >
          merge sort
        </button> */}
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
    </>
  );
};

export default Sort;
