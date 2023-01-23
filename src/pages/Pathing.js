import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "./pathing.css";

const Pathing = () => {
  // let targetNode = [];
  // let startNode = [];
  // const [targetNode, setTargetNode] = useState([]);
  // const [startNode, setStartNode] = useState([]);
  let targetNode = useRef([]);
  let startNode = useRef([]);
  const [graph, setGraph] = useState(() => generateGraph());
  let trace = [];

  useEffect(() => {
    console.log("graph render ->");
    console.log(graph);
    // console.log(targetNode.current);
    // console.log(startNode.current);
  }, [graph]);

  function generateGraph() {
    let newGraph = [];
    for (let i = 0; i < 15; i++) {
      let row = [];
      for (let j = 0; j < 15; j++) {
        row.push([0]);
      }
      newGraph.push(row);
    }
    return newGraph;
  }

  function setNode(row, col) {
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
          if (
            (startNode.current[0] === i && startNode.current[1] === j) ||
            (targetNode.current[0] === i && targetNode.current[1] === j)
          ) {
            return 1;
          }
          return 0;
        });
      });
    });
    console.log("startNode: [" + startNode.current + "]");
    console.log("targetNode: [" + targetNode.current + "]");
  }

  return (
    <>
      <div className="controls-container">
        <button
          className="control-button reset-graph"
          onClick={() => setGraph(() => generateGraph())}
        >
          reset
        </button>
      </div>

      <div className="info-container"></div>

      <div className="pathing-container">
        <div className="path-graph">
          {graph.map((row, rowi) => {
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
