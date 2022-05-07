import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ImageLoad } from "./ImageLoad";

const SHeader = styled.header`
  position: fixed;
  height: 90vh;
  background-color: ${(props) => props.theme.bgColor};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 100px;
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

const Icon = styled.span`
  text-decoration: none;
  text-align: center;
  width: 60px;

  height: 60px;
  font-family: "Pacifico", cursive;
  img {
    border: 4px solid ${(props) => props.theme.borderColor};
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  @media only screen and (max-width: 1000px) {
    display: none;
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
            </Icon>
          </Link>
        </Column>
        <Column>
          <Link to="/">
            <Icon>HardToSay</Icon>
          </Link>
        </Column>
      </Wrapper>
    </SHeader>
  );
};
