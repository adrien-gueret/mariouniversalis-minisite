import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  fill: currentColor;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  position: relative;
  vertical-align: text-bottom;
`;

export default function Icon({ width = 24, height = width, ...otherProps }) {
  return (
    <Svg
      $width={width}
      $height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...otherProps}
    />
  );
}
