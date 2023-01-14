import styled from "styled-components";

import Button from "./Button";

const IconButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing(0, 1)};

  & > svg {
    bottom: 2px;
    right: auto !important;
  }
`;

export default IconButton;
