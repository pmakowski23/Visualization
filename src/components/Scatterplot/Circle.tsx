import { useHover } from "@mantine/hooks";
import { RefObject } from "react";
import * as React from "react";

export const Circle = ({ i, r, d, fill, xScale, yScale, setActive }) => {
  const { hovered, ref } = useHover();

  return (
    <circle
      onClick={() => setActive(i)}
      key={i}
      ref={ref as any as RefObject<SVGCircleElement>}
      r={r}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      style={{ fill, cursor: hovered ? "pointer" : undefined }}
    />
  );
};
