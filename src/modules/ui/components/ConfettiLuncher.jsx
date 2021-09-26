import React from 'react';
import styled, { keyframes } from 'styled-components';

const Root = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    pointer-events: none;
    z-index: 100;
    overflow: hidden;
`;

const confettiAnimation = keyframes`
    0% { transform: rotateZ(15deg) rotateY(0deg) translate(0,0); opacity: 1; }
    25% { transform: rotateZ(5deg) rotateY(360deg) translate(-5vw,20vh); }
    50% { transform: rotateZ(15deg) rotateY(720deg) translate(5vw,60vh); }
    75% { transform: rotateZ(5deg) rotateY(1080deg) translate(-10vw,80vh); }
    100% { transform: rotateZ(15deg) rotateY(1440deg) translate(10vw,110vh); opacity: 0; }
`;

const Confetti = styled.div`
    pointer-events: none;
    width: 15px;
    height: 15px;
    background-color: #f2d74e;
    position: absolute;
    animation: 5s ${confettiAnimation} ease-in-out -2s 3;
    animation-fill-mode: forwards;
    transform-origin: left top;
    opacity: .8;
`;

const colors = ['pink', 'purple', 'blue', 'aqua', 'green', 'yellow', 'orange', 'red'];
const totalColors = colors.length;

export default function ConfettiLuncher() {
    return (
        <Root aria-hidden>
            { new Array(100).fill(null).map((_,i) => (
                <Confetti
                    key={i}
                    style={{
                        left: `${Math.floor(Math.random() * 100) + 1}%`,
                        animationDelay: `${-Math.random() * 10}s`,
                        backgroundColor: colors[i % totalColors],
                    }}
                />
            )) }
        </Root>
    );
}