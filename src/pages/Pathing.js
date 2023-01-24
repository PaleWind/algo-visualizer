import React, { useState, useEffect, useRef } from "react";

import "../App.css";
import "./pathing.css";

const Pathing = () => {
  const rows = 15;
  const cols = 15;
  let targetNode = useRef([]);
  let startNode = useRef([]);
  const [graph, setGraph] = useState(() => generateGraph());
  const [trace, setTrace] = useState(() => []);
  const [currentStep, setCurrentStep] = useState(() => 0);
  let tr = useRef([]);
  let tempGraph = useRef([]);
  let targetFound = useRef(false);
  const [isPaused, setPaused] = useState(true);

  useEffect(() => {
    let time = 0;
    if (!isPaused) {
      time = setInterval(() => {
        setCurrentStep((prev) => {
          return prev < trace.length ? prev + 1 : prev;
        });
      }, 201);
    }
    return () => {
      clearInterval(time);
    };
  }, [isPaused, trace.length]);

  useEffect(() => {
    console.log("graph render ->");
    targetFound.current = false;
    setTrace(() => []);
    setCurrentStep(() => 0);
    tr.current = [];
    tempGraph.current = graph.map((row, i) => {
      return row.map((col, j) => {
        return col;
      });
    });
  }, [graph]);

  function generateGraph() {
    let newGraph = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push([0]);
      }
      newGraph.push(row);
    }
    return newGraph;
  }

  function setNode(row, col) {
    setCurrentStep(0);
    if (
      startNode.current.length === 0 ||
      (startNode.current.length > 0 && targetNode.current.length > 0)
    ) {
      startNode.current = [row, col];
      targetNode.current = [];
    } else if (targetNode.current.length === 0) {
      targetNode.current = [row, col];
    }
    setGraph((prev) => {
      return prev.map((row, i) => {
        return prev.map((col, j) => {
          if (startNode.current[0] === i && startNode.current[1] === j) {
            return 3;
          }
          if (targetNode.current[0] === i && targetNode.current[1] === j) {
            return 2;
          }
          return 0;
        });
      });
    });
  }

  const stepForward = () => {
    if (!isPaused) {
      setPaused(() => true);
      return;
    }
    setCurrentStep((prev) => {
      return prev < trace.length ? prev + 1 : prev;
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

  function findPath() {
    if (trace.length === 0) {
      setTrace([...trace, graph]);
    }

    tempGraph.current = graph.map((row, i) => {
      return row.map((col, j) => {
        return col;
      });
    });
    console.log(startNode.current);
    dfs(startNode.current);
    // console.log(tr.current);
    setTrace(() => tr.current);
  }

  function dfs(start) {
    console.log(start);
    //base cases
    if (
      !start ||
      start[0] < 0 ||
      start[1] < 0 ||
      start[0] >= rows ||
      start[1] >= cols ||
      tempGraph.current[start[0]][start[1]] === 1 ||
      targetFound.current
    ) {
      return;
    }
    if (tempGraph.current[start[0]][start[1]] === 2) {
      targetFound.current = true;
      return;
    }

    if (tempGraph.current[start[0]][start[1]] === 0) {
      //t[start[0]][start[1]] = 1;
      tempGraph.current = tempGraph.current.map((row, i) => {
        return row.map((col, j) => {
          if (start[0] === i && start[1] === j) {
            return 1;
          }
          return col;
        });
      });
      tr.current.push(tempGraph.current);
    }

    // //traverse
    dfs([start[0] - 1, start[1]]);
    dfs([start[0] + 1, start[1]]);
    dfs([start[0], start[1] - 1]);
    dfs([start[0], start[1] + 1]);
  }

  return (
    <>
      <div className="controls-container">
        <button
          className="control-button reset-graph"
          onClick={() => {
            startNode.current = [];
            targetNode.current = [];
            setGraph(() => generateGraph());
          }}
        >
          Reset
        </button>
        <button
          className="control-button traverse-graph"
          onClick={() => {
            findPath();
          }}
          disabled={
            !startNode.current.length > 0 || !targetNode.current.length > 0
          }
        >
          Go!
        </button>

        {trace.length > 0 ? (
          <>
            <button
              className="control-button step-back"
              disabled={!trace.length > 0}
              onClick={() => {
                stepBackward();
              }}
            >
              -
            </button>
            <button
              className="control-button play"
              disabled={!trace.length > 0}
              onClick={() => {
                setPaused((prev) => !prev);
              }}
            >
              {isPaused ? "play" : "pause"}
            </button>
            <button
              className="control-button step-next"
              disabled={!trace.length > 0}
              onClick={() => {
                stepForward();
              }}
            >
              +
            </button>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="info-container">
        {!startNode.current.length > 0 ? (
          <i>Select a start node</i>
        ) : !targetNode.current.length > 0 ? (
          <i>Select a target node</i>
        ) : trace.length === 0 ? (
          <i>Hit go!</i>
        ) : (
          <i className="info">
            step {currentStep} / {trace.length}
          </i>
        )}
      </div>

      <div className="pathing-container">
        <div className="path-graph">
          {currentStep === 0
            ? graph.map((row, rowi) => {
                return (
                  <div key={rowi}>
                    {row.map((col, coli) => {
                      return (
                        <div
                          onClick={() => setNode(rowi, coli)}
                          className={"graph-node node-val-" + col}
                          key={coli}
                        ></div>
                      );
                    })}
                  </div>
                );
              })
            : trace[currentStep - 1].map((row, rowi) => {
                return (
                  <div key={rowi}>
                    {row.map((col, coli) => {
                      return (
                        <div
                          onClick={() => setNode(rowi, coli)}
                          className={"graph-node node-val-" + col}
                          key={coli}
                        ></div>
                      );
                    })}
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Pathing;
