import * as React from "react";

function AxisLeft({ yScale, width }) {
  const scale = yScale.ticks(5);
  const axis = scale.map((d, i) => (
    <g key={i} className="y-tick">
      <line
        style={{ stroke: "#e4e5eb" }}
        y1={yScale(d)}
        y2={yScale(d)}
        x2={width}
      />
      <text
        style={{ fontSize: 12, fill: "white" }}
        x={-20}
        dy=".32em"
        y={yScale(d)}
      >
        {d}
      </text>
    </g>
  ));
  return <>{axis}</>;
}

export default AxisLeft;
