import React, { useEffect, useState, useRef } from "react";

const Pathing2 = () => {
  const rows = 15;
  const cols = 15;
  const [startNode, setStartNode] = useState([]);
  const [targetNode, setTargetNode] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [trace, setTrace] = useState(() => [generateGraph()]);
  let searchGraph = [];
  let tempTrace = [];
  let targetFound = false;

  function generateGraph(start = [], target = []) {
    let newGraph = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        if (start.length > 0 && start[0] === i && start[1] === j) {
          row.push(3);
        } else if (target.length > 0 && target[0] === i && target[1] === j) {
          row.push(2);
        } else {
          row.push(0);
        }
      }
      newGraph.push(row);
    }
    return newGraph;
  }

  const setNode = (row, col) => {
    if (
      startNode.length === 0 ||
      (startNode.length > 0 && targetNode.length > 0)
    ) {
      setStartNode([row, col]);
      setTargetNode([]);
      setTrace([generateGraph([row, col], [])]);
    } else if (
      targetNode.length === 0 &&
      startNode.length > 0
      // startNode[0] !== row &&
      // startNode[1] !== col
    ) {
      setTargetNode([row, col]);
      searchGraph = generateGraph([startNode[0], startNode[1]], [row, col]);
      tempTrace = [];
      tempTrace.push(searchGraph.map((inner) => inner.slice()));
      dfs(startNode);
      setTrace(tempTrace);
    }
  };

  function findPath() {}

  function dfs(node) {
    //base cases
    if (
      !node ||
      node[0] < 0 ||
      node[1] < 0 ||
      node[0] >= rows ||
      node[1] >= cols ||
      searchGraph[node[0]][node[1]] === 1 ||
      targetFound
    ) {
      console.log("out of bounds");
      return;
    }
    if (searchGraph[node[0]][node[1]] === 2) {
      targetFound = true;
      console.log("found a 2");
      return;
    }

    if (searchGraph[node[0]][node[1]] === 0) {
      console.log("flipping a 0");
      searchGraph[node[0]][node[1]] = 1;
      tempTrace.push(searchGraph.map((inner) => inner.slice()));
      // console.log(tempTrace);
    }

    // //traverse
    dfs([node[0] - 1, node[1]]);
    dfs([node[0] + 1, node[1]]);
    dfs([node[0], node[1] - 1]);
    dfs([node[0], node[1] + 1]);
  }

  let steps = trace.length - 1;
  let graph = trace[currentStep];
  return (
    <div className="grid-container">
      <div className="title-container">
        <i id="title">Graph Traversal Visualizer</i>
      </div>
      <div className="controls-container">
        <i>
          start: {startNode[0]}, {startNode[1]}
          {""}
        </i>
        <i>
          target: {targetNode[0]}, {targetNode[1]}
          {"  "}
        </i>
        <i>
          steps: {currentStep}/{steps}
        </i>
      </div>
      <div className="pathing-container">
        <div className="path-graph">
          {graph &&
            graph.map((row, rowi) => {
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
    </div>
  );
};

export default Pathing2;
