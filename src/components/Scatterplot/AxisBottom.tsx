import React, { FC } from "react";
import { ScaleLinear } from "d3";

interface Props {
  xScale: ScaleLinear<number, number, never>;
  height: number;
}

const AxisBottom: FC<Props> = ({ xScale, height }) => {
  const textPadding = 10;

  const axis = xScale.ticks(10).map((d, i) => (
    <g className="x-tick" key={i}>
      <line
        style={{ stroke: "grey" }}
        y1={0}
        y2={height}
        x1={xScale(d)}
        x2={xScale(d)}
      />
      <text
        style={{ textAnchor: "middle", fontSize: 12, fill: "white" }}
        dy=".71em"
        x={xScale(d)}
        y={height + textPadding}
      >
        {d}
      </text>
      {i === 4 && (
        <text
          style={{ textAnchor: "middle", fontSize: 14, fill: "white" }}
          dy=".71em"
          x={xScale(d)}
          y={height + 3 * textPadding}
        >
          Cena (zł)
        </text>
      )}
    </g>
  ));
  return <>{axis}</>;
};

export default AxisBottom;
