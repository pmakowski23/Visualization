import * as React from 'react';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import AxisLeft from './AxisLeft';
import AxisBottom from './AxisBottom';

import { Circle } from './Circle';

export interface ScatterData {
  x: number;
  y: number;
}

interface Props {
  r?: string | number;
  fill?: string;
  data: ScatterData[];
  setActiveHotel: (i: number) => void;
}

export const Scatter: React.FC<Props> = ({ r, fill, data, setActiveHotel }) => {
  const w = 600,
    h = 600,
    margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40,
    };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, (d) => d.x) as [number, number])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d.y) as [number, number])
    .range([height, 0]);

  const circles = data.map((d, i) => (
    <>
      <Circle
        key={i}
        i={i}
        r={r}
        xScale={xScale}
        yScale={yScale}
        d={d}
        fill={fill}
        setActive={setActiveHotel}
      />
    </>
  ));

  return (
    <div>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisLeft yScale={yScale} width={width} />
          <AxisBottom xScale={xScale} height={height} />
          {circles}
        </g>
      </svg>
    </div>
  );
};
