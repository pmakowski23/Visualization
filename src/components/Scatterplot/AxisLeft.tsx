import { ScaleLinear } from "d3-scale";
import React, { FC } from "react";

interface Props {
  yScale: ScaleLinear<number, number, never>;
  width: number;
}

const AxisLeft: FC<Props> = ({ yScale, width }) => {
  const scale = yScale.ticks(5);
  const axis = scale.map((d, i) => {
    if (i % 2 === 0) {
      return (
        <g key={i} className="y-tick">
          <rect
            style={{ fill: "grey", opacity: 0.5 }}
            width={width}
            height={yScale(d) - yScale(scale[i + 1])}
            y={yScale(scale[i + 1])}
          />
          <text
            style={{ fontSize: 12, fill: "white" }}
            x={-20}
            dy=".32em"
            y={yScale(d)}
          >
            {d}
          </text>
          <text
            style={{ fontSize: 12, fill: "white" }}
            x={-20}
            dy=".32em"
            y={yScale(scale[i + 1])}
          >
            {scale[i + 1]}
          </text>
        </g>
      );
    }
  });
  return <>{axis}</>;
};

export default AxisLeft;
