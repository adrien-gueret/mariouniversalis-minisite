import React from "react";
import styled from "styled-components";

import Info from "../../icons/Info";

const Root = styled.span`
  cursor: help;
`;

export default function InfoTooltip(props) {
  return (
    <Root {...props}>
      <Info width={16} />
    </Root>
  );
}
