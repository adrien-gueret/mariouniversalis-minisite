import styled from "styled-components";

const Button = styled.button`
  ${({ theme }) => theme.typography.variants.button};

  padding: ${({ theme }) => theme.spacing(1, 1, 1.25, 1)};
  border-radius: 20px;
  border: 2px solid transparent;
  flex-shrink: 0;

  cursor: pointer;
  text-decoration: none;
  display: inline-block;

  color: ${({ theme, $primary }) =>
    $primary ? theme.palette.text.contrasted : theme.palette.text.default};
  background-color: ${({ theme, $primary }) =>
    $primary
      ? theme.palette.button.primary
      : theme.palette.background.secondary};

  ${({ theme }) => theme.breakpoints.up("sm")} {
    padding: ${({ theme }) => theme.spacing(1, 3, 1.25, 3)};
  }

  &:not(:disabled) {
    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.palette.line};
      color: ${({ theme }) => theme.palette.text.default};
      background-color: ${({ theme }) => theme.palette.background.secondary};
      & > svg:first-child {
        transform: translateX(${({ theme }) => theme.spacing(-0.5)});
      }

      & > svg:last-child {
        transform: translateX(${({ theme }) => theme.spacing(0.5)});
      }
    }

    &:hover {
      outline: none;
    }

    &:active {
      color: ${({ theme }) => theme.palette.button.primary};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & > svg {
    left: ${({ theme }) => theme.spacing(-1)};
    transition: transform 200ms;

    &:last-child {
      left: auto;
      right: ${({ theme }) => theme.spacing(-1)};
    }
  }
`;

export default Button;
