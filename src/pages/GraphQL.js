import React, { useEffect, useState, useRef } from "react";

const GraphQL = () => {
  const [trace, setTrace] = useState([]);
  let tempTrace = [];
  let searchGraph = [];
  const renderCount = useRef(0);
  let c = 0;

  useEffect(() => {
    renderCount.current += 1;
  });

  function updateArray() {
    tempTrace = [];
    searchGraph = [[4], [2], [3], [1]];
    tempTrace.push([...searchGraph]);
    // for (let i = 0; i < 6; i++) {
    //   searchGraph[0] = i;
    //   tempTrace.push([...searchGraph]);
    // }
    dfs();
    setTrace(tempTrace);
  }

  function dfs() {
    if (c < 6) {
      c += 1;
      searchGraph[0] = c;
      tempTrace.push([...searchGraph]);
      dfs();
    }
  }

  return (
    <div style={{ marginLeft: "4rem" }}>
      <i>render count: {renderCount.current}</i>

      <button onClick={() => updateArray()}>update array</button>
      <i>
        {trace.map((v, i) => {
          return <div key={i}>{v}</div>;
        })}
      </i>
    </div>
  );
};

export default GraphQL;
