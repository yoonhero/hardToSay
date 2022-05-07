import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ImageLoad } from "./ImageLoad";

const SHeader = styled.header`
  position: fixed;
  width: 140px;
  height: 90vh;
  background-color: ${(props) => props.theme.bgColor};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  max-width: 200px;
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
`;

const Column = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Icon = styled.div`
  text-decoration: none;
  display: inline-box;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;

  font-family: "Pacifico", cursive;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;

  img {
    width: 50%;
    height: 50%;
  }

  transition: transform 0.7s ease-in-out;
  &:hover {
    transform: rotate(180deg) scale(1.2);
    background: #99d98c;
  }
`;

export const Header = () => {
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to="/">
            <Icon>
              <ImageLoad image={"../../logo.png"} />
              HardToSay
            </Icon>
          </Link>
        </Column>
      </Wrapper>
    </SHeader>
  );
};
