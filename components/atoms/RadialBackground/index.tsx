import React from "react";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

export default function RadialBackground() {

  return (
    <Svg width={'100%'} height={'100%'} style={{ position: "absolute" }}>
      <Defs>
        <RadialGradient
          id="grad"
          cx="50%"
          cy="30%"     // moves the bright spot upward
          rx="60%"     // radius spread horizontally
          ry="50%"     // radius spread vertically
          fx="50%"
          fy="30%"
        >
          <Stop offset="0%" stopColor="#1656D0" stopOpacity="0.6" />
          <Stop offset="50%" stopColor="#2150AA" stopOpacity="0.4" />
          <Stop offset="100%" stopColor="#323439" stopOpacity="0.1" />
        </RadialGradient>
      </Defs>

      <Rect x="0" y="0" width={'100%'} height={'100%'} fill="url(#grad)" />
    </Svg>
  );
}
