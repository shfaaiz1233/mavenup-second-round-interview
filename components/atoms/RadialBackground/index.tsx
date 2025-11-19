import React from "react";
import { Dimensions } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

export default function RadialBackground() {
  const { width, height } = Dimensions.get("window");

  return (
    <Svg width={'100%'} height={'100%'} style={{ position: "absolute" }}>
      <Defs>
        <RadialGradient
          id="grad"
          cx="50%"
          cy="30%"     // adjust: moves the bright spot upward
          rx="70%"     // radius spread horizontally
          ry="70%"     // radius spread vertically
          fx="50%"
          fy="30%"
        >
          <Stop offset="0%" stopColor="#1656D0" stopOpacity="0.5" />
          <Stop offset="50%" stopColor="#2150AA" stopOpacity="0.4" />
          <Stop offset="100%" stopColor="#323439" stopOpacity="0.1" />
        </RadialGradient>
      </Defs>

      <Rect x="0" y="0" width={'100%'} height={'100%'} fill="url(#grad)" />
    </Svg>
  );
}
