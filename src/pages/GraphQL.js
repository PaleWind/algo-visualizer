import React, { useEffect, useState, useRef } from "react";

const GraphQL = () => {
  const [var1, setVar1] = useState(0);
  const [var2, setVar2] = useState(0);
  const [var3, setVar3] = useState(0);

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  function handleClick() {
    setVar3((prev) => prev + 1);
  }
  return (
    <div style={{ marginLeft: "4rem" }}>
      <i>render count: {renderCount.current}</i>
      <button onClick={() => setVar1(var1 + 1)}>var1</button>
      <button onClick={() => setVar2(() => var2 + 1)}>var2</button>
      <button onClick={() => handleClick()}>var3 {var3}</button>
    </div>
  );
};

export default GraphQL;
