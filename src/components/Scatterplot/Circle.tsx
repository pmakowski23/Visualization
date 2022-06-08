import React, { FC, RefObject } from "react";
import { useHover } from "@mantine/hooks";
import { ScatterData } from "./Scatter";

interface Props {
  r?: string | number;
  fill?: string;
  d: ScatterData;
  i: number;
  xScale: (d: number) => number;
  yScale: (d: number) => number;
  setActive: (i: number) => void;
}

export const Circle: FC<Props> = ({
  i,
  r,
  d,
  fill,
  xScale,
  yScale,
  setActive,
}) => {
  const { hovered, ref } = useHover();

  return (
    <>
      <circle
        textAnchor="bottom"
        onClick={() => setActive(i)}
        key={i}
        ref={ref as any as RefObject<SVGCircleElement>}
        r={r}
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        style={{ fill, cursor: hovered ? "pointer" : undefined }}
      />
      {hovered && (
        <text
          x={xScale(d.x) + 7}
          y={yScale(d.y)}
          text-anchor="right"
          fill="white"
          id="tooltip"
          dy=".3em"
          style={{ zIndex: 1000 }}
        >
          {d.hotelName}
        </text>
      )}
    </>
  );
};
