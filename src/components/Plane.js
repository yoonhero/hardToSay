import styled, { keyframes } from "styled-components";

const PlaneUpDown = keyframes`
20% {
      transform: rotate(10deg);
    }
    60% {
      transform: rotate(20deg);
    }
    80% {
      transform: rotate(20deg);
    }
    100% {
      transform: rotate(15deg);
    }
`;

const PlaneLeftRight = keyframes`
  from {
      left: -200px;
      top: 200px;
    }
    to {
      left: 130%;
      top: 500px;
    }
`;

const PlaneCotainer = styled.div`
  position: absolute;
  top: 100px;

  width: 100%;
`;

const Paperplane = styled.div`
  z-index: 10;
  position: relative;
  left: 40%;
  top: 100px;
  animation: ${PlaneLeftRight} 4s linear infinite,
    ${PlaneUpDown} 4s linear infinite;
`;

const PlaneRight = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 45px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 230px solid white;
  transform: rotate(61deg);
`;
const PlaneBottom = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 45px solid #676d70;
  top: 142px;
  transform: rotate(-5deg);
  left: -105px;
  z-index: -1;
`;
const PlaneTop = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 60px solid #c1c7c9;
  top: 130px;
  transform: rotate(5deg);
  left: -120px;
  z-index: -3;
`;
const PlaneMiddle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 270px solid #c1c7c9;
  top: -27px;
  transform: rotate(72deg);
  left: -15px;
  z-index: -2;
`;
const PlaneLeft = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-bottom: 270px solid white;
  transform: rotate(78deg) skewY(-35deg);
  left: -37px;
  z-index: 2;
  top: -60px;
`;

export {
  PlaneUpDown,
  PlaneLeftRight,
  PlaneCotainer,
  Paperplane,
  PlaneRight,
  PlaneBottom,
  PlaneTop,
  PlaneMiddle,
  PlaneLeft,
};
