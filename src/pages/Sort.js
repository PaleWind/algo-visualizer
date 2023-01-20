import React, { useEffect, useState } from "react";
import "../App.css";

const Sort = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [trace, setTrace] = useState([]);
  let t = [];

  useEffect(() => {
    resetTrace();
  }, []);

  useEffect(() => {
    console.log(trace);
  }, [trace]);

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
    for (let i = 0; i < 10; i++) {
      array.push(Math.floor(Math.random() * 200 - 5 + 1) + 5);
    }
    return array;
  }

  const stepForward = () => {
    setCurrentStep((prev) => {
      return prev < trace.length - 1 ? prev + 1 : prev;
    });
  };

  function stepBackward() {
    setCurrentStep((prev) => {
      return prev > 0 ? prev - 1 : prev;
    });
  }

  // function bubbleSort() {
  //   let array = arrayToSort.slice();
  //   for (let i = 0; i < array.length - 1; i++) {
  //     for (let j = 0; j < array.length - i - 1; j++) {
  //       if (array[j] > array[j + 1]) {
  //         let temp = array[j];
  //         array[j] = array[j + 1];
  //         array[j + 1] = temp;
  //         setTrace((prev) => {
  //           console.log(prev);
  //           // prev.push([array]);
  //           // return prev;
  //         });
  //       }
  //       console.log(trace);
  //     }
  //   }
  // }

  function sorty() {
    let array = trace[trace.length - 1].slice();
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        let temp = array[i - 1];
        array[i - 1] = array[i];
        array[i] = temp;
        return array;
      }
    }
    return array;
  }

  function addTrace() {
    setTrace((prev) => {
      let a = sorty();
      if (arraysAreEqual(prev[prev.length - 1], a)) {
        console.log("sorted");
        return prev;
      }
      setCurrentStep(trace.length);
      return [...prev, a];
      // return a;
    });
  }

  function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
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
          onClick={() => addTrace()}
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
          {/* {trace.length} */}
        </div>
      </div>
    </>
  );
};

export default Sort;
