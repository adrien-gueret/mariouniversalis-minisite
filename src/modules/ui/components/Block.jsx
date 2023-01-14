import React from "react";
import styled from "styled-components";

const Root = styled.div`
  ${({ theme }) => theme.typography.variants.body2}

  display: block;
  border-radius: 20px;
  min-width: 100px;
  background-color: ${({ theme }) => theme.palette.background.secondary};
  padding: ${({ theme }) => theme.spacing(4)};
  position: relative;
  text-align: center;
`;

const Dots = styled.div`
  position: relative;
  height: 10px;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgb(0, 160, 220);
    position: absolute;
  }

  &::before {
    left: ${({ theme }) => theme.spacing(-2)};
  }

  &::after {
    right: ${({ theme }) => theme.spacing(-2)};
  }

  &:first-child {
    &::before,
    &::after {
      bottom: ${({ theme }) => theme.spacing(2)};
    }
  }

  &:last-child {
    &::before,
    &::after {
      top: ${({ theme }) => theme.spacing(2)};
    }
  }
`;

const Content = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.variants.title}
`;

const Actions = styled.div`
  padding: ${({ theme }) => theme.spacing(4, 4, 0, 4)};

  & > * {
    margin: ${({ theme }) => theme.spacing(1)};
  }
`;

function Block({
  className,
  children,
  actions = null,
  title = null,
  titleComponent: TitleComponent = "h2",
  titleProps = {},
  ...otherProps
}) {
  return (
    <Root className={className} {...otherProps}>
      <Dots />
      {title && (
        <Title as={TitleComponent} {...titleProps}>
          {title}
        </Title>
      )}
      <Content>{children}</Content>
      {actions && <Actions>{actions}</Actions>}
      <Dots />
    </Root>
  );
}

export default Block;
