import React, { useState, useEffect } from "react";
import "../App.css";

const Pathing = () => {
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    setGraph(() => generateGraph());
  }, []);

  function generateGraph() {
    let graph = [];
    for (let i = 0; i < 15; i++) {
      let row = [];
      for (let j = 0; j < 15; j++) {
        row.push([]);
      }
      graph.push(row);
    }
    console.log(graph);
    return graph;
  }

  return (
    <>
      <div className="controls-container"></div>

      <div className="info-container"></div>

      <div className="pathing-container">
        <div className="path-graph">
          {graph.map((row, rowi) => {
            return (
              <div>
                {row.map((col, coli) => {
                  return <div className="graph-node" key={coli}></div>;
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
