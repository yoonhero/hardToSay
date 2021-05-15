import {
  faArrowCircleRight,
  faCheck,
  faPaperPlane,
  faPrint,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { dbService } from "../fbase";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { ImageLoad } from "../components/ImageLoad";
const Main = styled.main`
  width: 100%;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Paper = styled.div`
  position: relative;
  width: 90%;
  max-width: 800px;
  min-width: 400px;
  height: 480px;
  margin: 0 auto;
  background: ${(props) =>
    props.modes === 1 ? "#fafafa" : props.modes === 2 ? "#f0eea1" : null};
  /* background: #fafafa; */
  /* f0eea1 */
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
    /* width: 10px; */
    background: radial-gradient(#575450 6px, transparent 7px) repeat-y;
    background-size: 30px 30px;
    border-right: 3px solid #d44147;
    ${(props) =>
    props.modes === 2 ? "border-left: 3px solid #d44147;" : null};
    /* border-left: 3px solid #d44147; */
    box-sizing: border-box;
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
const LetterText = styled.p`
  width: ${(props) =>
    props.modes === 1 ? "80%" : props.mode === 2 ? "90%" : "80%"};

  /* margin-left: 60px; */
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  line-height: 30px;
  padding: 0 10px;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: "Nanum Gothic", cursive;

  font-size: ${(props) =>
    props.length < 300 ? "20px" : props.length < 500 ? "16px" : props.length < 600 ? "14px" : "12px"};
  box-sizing: border-box;
  z-index: 1;
  resize: none;
  color: rgba(0, 0, 0, 0.7);
  @media only screen and (max-width: 580px) {
    width: 70%;
  }
`;

const ManuScript = styled.div`
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
const ManuScriptContainer = styled.div`
  margin: 0 auto;
  max-width: 860px;
`;
const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 25px;
    font-weight: 600;
    margin: 20px;
  }
`;

const Button = styled.button`
  margin-top: 4rem;
  padding: 18px 25px;
  cursor: pointer;
  font-size: 15px;
  background-color: #f4f9f9;
  border: none;
  border-radius: 30px;
  letter-spacing: 1px;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  font-weight: 400;
  color: #000;
  &:hover {
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;

const updown = keyframes`
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

const move = keyframes`
  from {
      left: -200px;
      top: 0px;
    }
    to {
      left: 130%;
      top: 400px;
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
  animation: ${move} 4s linear infinite, ${updown} 4s linear infinite;
`;

const Right = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 45px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 230px solid white;
  transform: rotate(61deg);
`;
const Bottom = styled.div`
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
const Top = styled.div`
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
const Middle = styled.div`
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
const Left = styled.div`
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

const CopyRight = styled.p`
  color: #686666da;
  font-weight: 400;
  padding: 5px;
  a {
    color: #e74c3c;
    padding: 5px;
    font-weight: 600;
  }
`;

const CopyRightContainer = styled.div`
  margin: 20px;
  padding: 20px;
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  img {
    max-width: 300px;
  }
  p {
    font-size: 20px;
  }
  @media only screen and (max-width: 500px) {
    img {
      max-width: 250px;
    }
    p {
      font-size: 15px;
    }
  }
`;

const LoadingIcon = styled.div`
  padding: 20px;
`;

export default function Message() {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  var docRef = dbService.collection("cards").doc(id);
  const location = useHistory();
  useEffect(() => {
    docRef.get().then((doc) => {
      if (doc.exists) {
        setData(doc.data());
        setLoading(false);
      } else {
        console.log("No such document!");
        location.push({ pathname: "/NotFound" });
      }
    });
  }, []);

  function resizeMnuascriptContainer(element) {
    element.style.width = `${(Math.floor(element.parentElement.offsetWidth / 24) - 1) * 24 - 1
      }px`;
  }
  function resizeImage(element) {
    element.querySelectorAll("img").forEach((img) => {
      const { naturalWidth, naturalHeight } = img;
      const ratio = naturalHeight / naturalWidth;
      const newHeight = element.offsetWidth * ratio;

      img.height = Math.floor(newHeight - (newHeight % 32) - 8);
    });
  }

  function resizeText() {
    const manuscript = document.querySelectorAll(".manuscript");
    const handleResize = () => {
      manuscript.forEach((elt) => {
        resizeMnuascriptContainer(elt);
      });
    };
    window.addEventListener("load", handleResize, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    manuscript.forEach((element) => {
      element.querySelectorAll("p").forEach((element) => {
        const text = element.innerText;
        element.innerHTML = "";
        [...text].forEach((word) => {
          const span = document.createElement("span");
          const textNode = document.createTextNode(word);
          span.appendChild(textNode);
          element.append(span);
        });
      });
    });
  }
  useEffect(() => {
    if (data.paperMode === undefined) {
      const manuscript = document.querySelectorAll(".manuscript");
      const handleResize = () => {
        manuscript.forEach((elt) => {
          resizeMnuascriptContainer(elt);
        });
      };
      window.addEventListener("load", handleResize, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });
      manuscript.forEach((element) => {
        element.querySelectorAll("p").forEach((element) => {
          const text = element.innerText;
          element.innerHTML = "";
          [...text].forEach((word) => {
            const span = document.createElement("span");
            const textNode = document.createTextNode(word);
            span.appendChild(textNode);
            element.append(span);
          });
        });
      });
    }
  }, [data]);
  // useEffect(() => {
  //   // const manuscript = document.querySelectorAll(".manuscript");
  //   // const handleResize = () => {
  //   //   manuscript.forEach((elt) => {
  //   //     resizeMnuascriptContainer(elt);
  //   //   });
  //   // };
  //   // window.addEventListener("load", handleResize, { passive: true });
  //   // window.addEventListener("resize", handleResize, { passive: true });
  //   // manuscript.forEach((element) => {
  //   //   element.querySelectorAll("p").forEach((element) => {
  //   //     const text = element.innerText;
  //   //     element.innerHTML = "";
  //   //     [...text].forEach((word) => {
  //   //       const span = document.createElement("span");
  //   //       const textNode = document.createTextNode(word);
  //   //       span.appendChild(textNode);
  //   //       element.append(span);
  //   //     });
  //   //   });
  //   // });
  // }, [data]);
  return (
    <>
      {!loading ? (
        <Container>
          <h1>당신에게 전하는 말</h1>

          {data.paperMode === undefined ? (
            <ManuScriptContainer>
              <ManuScript className="manuscript">
                <p>{ data.text }</p>
              </ManuScript>
            </ManuScriptContainer>
          ) : (
            /* <Paper modes={data.paperMode}>
          <PaperContent modes={data.paperMode}>
            <Input>{data.text}</Input>
          </PaperContent>
        </Paper> */
            /* <Paper modes={data.paperMode}>
            <PaperContent modes={data.paperMode}>
              <Input>{data.text}</Input>
            </PaperContent>
          </Paper> */
            <Paper modes={ data.paperMode } img={ data.attachmentUrl }>
              <PaperContent modes={ data.paperMode }>
                <LetterText length={ data.text.length }>{ data.text }</LetterText>
              </PaperContent>
            </Paper>
          ) }

          <Link to="/">
            <Button>답장하기</Button>
          </Link>
        </Container>
      ) : (
        <>
          <Main>
            {/* <FontAwesomeIcon icon={faSpinner} size="3x" pulse /> */ }
            <Loading>
              <CopyRight style={ { fontSize: "30px" } }>
                당신에게 전할 말이 있습니다.
              </CopyRight>
              <ImageLoad image={ "../../logo.png" } />
              <CopyRight>
                © 2021 All rights reserved | Made By Yoonhero
              </CopyRight>
              <CopyRight>Logo Designed by Merong</CopyRight>
            </Loading>
          </Main>
          <PlaneCotainer>
            <Paperplane>
              <Right></Right>
              <Left></Left>
              <Bottom></Bottom>
              <Top></Top>
              <Middle></Middle>
            </Paperplane>
          </PlaneCotainer>
        </>
      ) }
    </>
  );
}

//http://localhost:3000/card/e5fab4a3-8b49-4074-b39f-2e19ad985137
