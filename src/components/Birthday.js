import React, { useState, useEffect } from "react";
import Confetti from "react-dom-confetti";
import styled, { keyframes } from "styled-components";

const M = styled.div`
  margin: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BirthdayTitle = styled.h1`
  font-size: 50px;

  @media only screen and (max-width: 780px) {
    font-size: 60px;
    padding: 10px;
  }
`;

const opacityChange = keyframes`
0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const PresentButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 30px;

  &:focus {
    outline: 0;
  }

  @media only screen and (max-width: 600px) {
    animation: ${opacityChange} 1s infinite;
  }
  &:hover {
    animation: ${opacityChange} 1s infinite;
  }
`;

const PresentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const confettiConfig = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: 240,
  decay: 0.9,
};

const Birthday = (setClick) => {
  const [item, setItem] = useState("🎁");
  const [confetti, setConfetti] = useState(false);
  const [hint, setHint] = useState("선물을 클릭해봐!");

  const openPresent = () => {
    let presents = [
      "😺",
      "🐶",
      "🎊",
      "🎈",
      "🎉",
      "✨",
      "🎇",
      "🎆",
      "🐇",
      "🦆",
      "🍂",
      "🎂",
    ];

    setItem(presents[Math.floor(Math.random() * presents.length)]);
    setConfetti(true);
    setHint("");
  };

  return (
    <M>
      <div style={{ fontSize: "15px" }}>{hint}</div>
      <PresentContainer>
        <Confetti active={confetti} config={confettiConfig} />
        <PresentButton onClick={() => openPresent()}>{item}</PresentButton>
      </PresentContainer>
    </M>
  );
};

// TODO
// https://github.com/erdoganbavas/web-practices/blob/master/bday-balloons/balloons.css
const Balloons = () => {};

export { Birthday, BirthdayTitle };
