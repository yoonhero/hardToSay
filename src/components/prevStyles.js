import styled from "styled-components";

const Logo = styled.p`
  font-size: 20px;
  font-family: "Ubuntu", sans-serif;
  font-weight: 300;
  margin-top: -10px;
`;
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
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
