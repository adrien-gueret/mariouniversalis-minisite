import styled from "styled-components";

const TextButton = styled.button`
  ${({ theme }) => theme.typography.variants.button2};

  padding-left: 0;
  padding-right: ${({ theme }) => theme.spacing(1)};
  flex-shrink: 0;

  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;

  border: 0;

  color: ${({ theme }) => theme.palette.text.default};
  background-color: transparent;

  & > svg {
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
`;

export default TextButton;
