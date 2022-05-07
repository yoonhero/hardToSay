import styled from "styled-components";

const Paper = styled.div`
  position: relative;
  width: 90%;
  max-width: 800px;

  height: 480px;
  margin: 0 auto;
  background: ${(props) =>
    props.modes === 1 ? "#fafafa" : props.modes === 2 ? "#f0eea1" : null};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  overflow: auto;
  background-image: ${(props) =>
    props.modes === 3 ? `url(${props.img})` : null};
  background-size: auto;
  background-repeat: no-repeat;

  background-position: center;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin-left: ${(props) => (props.modes === 2 ? "50px" : null)};
    width: ${(props) =>
      props.modes === 1 ? "60px" : props.modes === 2 ? "10px" : "60px"};
    background: radial-gradient(#575450 6px, transparent 7px) repeat-y;
    background-size: 30px 30px;
    border-right: 3px solid #d44147;
    ${(props) =>
      props.modes === 2 ? "border-left: 3px solid #d44147;" : null};
    box-sizing: border-box;
  }

  @media only screen and (max-width: 780px) {
    width: 100%;
  }
`;

const PaperContent = styled.div`
  position: absolute;

  top: 30px;
  right: 0;
  bottom: 30px;
  left: 0px;
  background: linear-gradient(transparent, transparent 28px, #91d1d3 28px);
  background-size: 30px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LetterText = styled.textarea`
  width: ${(props) =>
    props.modes === 1 ? "80%" : props.mode === 2 ? "90%" : "80%"};
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  line-height: 30px;
  padding: 0 10px;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: "Jua", sans-serif;

  font-size: 20px;
  box-sizing: border-box;
  z-index: 1;
  resize: none;
  color: rgba(0, 0, 0, 0.7);
  @media only screen and (max-width: 580px) {
    width: 70%;
  }
`;

const OriginalLetter = styled.div`
  font-family: "Do Hyeon", sans-serif;
  font-size: 16px;
  line-height: 32px;
  padding: 8px 0;
  border: 2px solid #d12e2e;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 1px,
      #fff 1px,
      #fff 8px,
      rgba(255, 255, 255, 0) 8px,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 1px,
      #fff 1px,
      #fff 8px,
      rgba(255, 255, 255, 0) 8px,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(
      to right,
      #d12e2e 0%,
      #d12e2e 1px,
      rgba(255, 255, 255, 0) 1px,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(
      to bottom,
      #d12e2e 0%,
      #d12e2e 1px,
      rgba(255, 255, 255, 0) 1px,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(
      to bottom,
      #d12e2e 0%,
      #d12e2e 1px,
      rgba(255, 255, 255, 0) 1px,
      rgba(255, 255, 255, 0) 100%
    ),
    #fff;
  background-size: 24px 32px;
  margin: 0 auto;
  background-position: 0 -1px, 0 0, -1px 0, 0 8px, 0px -1px;
  p {
    display: flex;
    flex-wrap: wrap;
    margin: -8px -1px 8px 0;
    font-size: 16px;
    line-height: 24px;
    span {
      display: inline-block;
      text-align: center;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      margin-top: 8px;
    }
  }
  img {
    display: block;
    width: auto;
    max-width: 100%;
    margin: 0 auto;
    object-fit: cover;
  }
`;
const OriginalLetterContainer = styled.div`
  margin: 0 auto;
  max-width: 860px;
`;

export {
  Paper,
  PaperContent,
  LetterText,
  OriginalLetter,
  OriginalLetterContainer,
};

// const LetterText = styled.p`
//   width: ${(props) =>
//     props.modes === 1 ? "80%" : props.mode === 2 ? "90%" : "80%"};

//   /* margin-left: 60px; */
//   max-width: 100%;
//   height: 100%;
//   max-height: 100%;
//   line-height: 30px;
//   padding: 0 10px;
//   border: 0;
//   outline: 0;
//   background: transparent;
//   font-family: "Nanum Gothic", cursive;

//   font-size: ${(props) =>
//     props.length < 300
//       ? "20px"
//       : props.length < 500
//       ? "16px"
//       : props.length < 600
//       ? "14px"
//       : "12px"};
//   box-sizing: border-box;
//   z-index: 1;
//   resize: none;
//   color: rgba(0, 0, 0, 0.7);
//   @media only screen and (max-width: 580px) {
//     width: 70%;
//   }
// `;
