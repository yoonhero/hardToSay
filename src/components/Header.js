import React, { useEffect, useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  align-items: center;
`;

const Icon = styled.span`
  text-decoration: none;
  margin-left: 15px;
  img {
    width: 40px;
    height: 40px;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.p`
  font-size: 20px;
  font-family: "Ubuntu", sans-serif;
  font-weight: 300;
  margin-top: -10px;
`;

const Infomation = styled.div`
  position: absolute;
  top: 60px;
  left: 10px;
  z-index: 10;
  max-width: 200px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.9);
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-bottom-color: rgba(255, 255, 255, 0.9);
    border-top: 0;
    margin-left: 5px;
    margin-top: -20px;
    left: 0;
    top: 0;
  }
  h1 {
    font-family: "Nanum", sans-serif;
    font-weight: 500;
    font-size: 16px;
  }
  p {
    font-family: "Nanum", sans-serif;
    font-weight: 400;
  }
`;

export const Header = () => {
  const [show, setShow] = useState(false);

  const onMouseover = () => {
    setShow(true);
  };
  const onMouseout = () => {
    setShow(false);
  };

  useEffect(() => {
    const ourlogo = document.querySelector(".ourlogo");
    ourlogo.addEventListener("mouseover", onMouseover);
    ourlogo.addEventListener("mouseout", onMouseout);
  }, []);
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Icon>
            <Link to="/">
              <Logo className="ourlogo">ATC</Logo>
              { show ? (
                <Infomation>
                  <img src="./atclogo.png" />
                  <h1>저희는 솔빛중학교 어코딩투 동아리입니다.</h1>
                  <p>
                    여러분 곁에 있는 소중한 사람에게 직접 말하지 못했던 감사의
                    말을 해봐요.
                  </p>
                </Infomation>
              ) : null }
            </Link>
          </Icon>
        </Column>
        <Column>
          <h1>직접 말하지 못했던 말들을</h1>
        </Column>
      </Wrapper>
    </SHeader>
  );
};
