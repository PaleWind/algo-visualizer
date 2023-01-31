import React, { useEffect, useState, useRef } from "react";

const Pathing2 = () => {
  const rows = 15;
  const cols = 15;
  const [startNode, setStartNode] = useState([]);
  const [targetNode, setTargetNode] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [trace, setTrace] = useState(() => [generateGraph()]);
  const [isPaused, setPaused] = useState(true);
  const [speed, setSpeed] = useState(100);
  let currentAlgo = useRef(0);

  let algos = [dfs, bfs];
  let searchGraph = [];
  let tempTrace = [];
  let targetFound = false;

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
  }, [isPaused, trace.length, speed]);

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
    setCurrentStep(0);
    if (
      startNode.length === 0 ||
      (startNode.length > 0 && targetNode.length > 0)
    ) {
      setStartNode([row, col]);
      setTargetNode([]);
      setTrace([generateGraph([row, col], [])]);
    } else if (
      targetNode.length === 0 &&
      startNode.length > 0 &&
      !compareArrays(startNode, [row, col])
    ) {
      setTargetNode([row, col]);
      searchGraph = generateGraph([startNode[0], startNode[1]], [row, col]);
      tempTrace = [];
      tempTrace.push(searchGraph.map((inner) => inner.slice()));
      findPath();
      setTrace(tempTrace);
    }
  };

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

  function findPath() {
    algos[currentAlgo.current](startNode);
  }

  function bfs(startNode) {
    let q = [];
    q.push(startNode);
    console.log(q);
    while (q.length > 0) {
      let node = q.shift();
      if (searchGraph[node[0]][node[1]] === 2) {
        searchGraph = true;
        return;
      }
      if (searchGraph[node[0]][node[1]] === 0) {
        searchGraph[node[0]][node[1]] = 1;
        tempTrace.push(searchGraph.map((inner) => inner.slice()));
      }
      if (node[0] + 1 < rows && node[0] + 1 !== 1)
        q.push([node[0] + 1, node[1]]);
      if (node[0] - 1 >= 0 && node[0] - 1 !== 1) q.push([node[0] - 1, node[1]]);
      if (node[1] + 1 < rows && node[1] + 1 !== 1)
        q.push([node[0], node[1] + 1]);
      if (node[1] - 1 >= 0 && node[1] - 1 !== 1) q.push([node[0], node[1] - 1]);
    }
  }

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
      return;
    }
    if (searchGraph[node[0]][node[1]] === 2) {
      targetFound = true;
      return;
    }

    if (searchGraph[node[0]][node[1]] === 0) {
      searchGraph[node[0]][node[1]] = 1;
      tempTrace.push(searchGraph.map((inner) => inner.slice()));
    }

    // //traverse
    dfs([node[0] - 1, node[1]]);
    dfs([node[0] + 1, node[1]]);
    dfs([node[0], node[1] - 1]);
    dfs([node[0], node[1] + 1]);
  }

  const compareArrays = (a, b) => {
    return a.toString() === b.toString();
  };

  let steps = trace.length - 1;
  let graph = trace[currentStep];
  return (
    <div className="grid-container">
      <div className="title-container">
        <i id="title">Graph Traversal Visualizer</i>
      </div>
      <div className="controls-container">
        <select
          className="control-button"
          onChange={(e) => {
            currentAlgo.current = e.target.value;
          }}
          name="Algorithm"
          id="selected-algo"
        >
          <option value={0}>DFS</option>
          <option value={1}>BFS</option>
          {/* <option value="A*">A*</option>
          <option value="Daijkstra">Daijkstra</option> */}
        </select>
        <button
          className="control-button"
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
          className="control-button"
          disabled={!trace.length > 0}
          onClick={() => {
            stepForward();
          }}
        >
          +
        </button>
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
