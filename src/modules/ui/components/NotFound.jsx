import React from "react";
import styled from "styled-components";

import marioImage from "../../../pages/images/mario-finding-nothing.png";

const NotFoundContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const NotFoundContent = styled.p`
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const SuperMario = styled.img`
  height: 200px;
  vertical-align: middle;

  margin: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 400px;
  }
`;

export default function NotFound({ children }) {
  return (
    <NotFoundContainer>
      <SuperMario src={marioImage} alt="" />
      {children && <NotFoundContent>{children}</NotFoundContent>}
    </NotFoundContainer>
  );
}
