import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { dbService } from "../fbase";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ImageLoad } from "../components/ImageLoad";
import {
  Paperplane,
  PlaneCotainer,
  PlaneRight,
  PlaneBottom,
  PlaneTop,
  PlaneMiddle,
  PlaneLeft,
} from "../components/Plane";
import { CopyRight, Loading } from "../components/Loading";
import {
  OriginalLetter,
  OriginalLetterContainer,
  Paper,
  PaperContent,
  LetterText,
} from "../components/Letter";
import { Button } from "../components/Button";

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Container = styled.div`
  font-family: "Jua", sans-serif;
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
        location.push({ pathname: "/NotFound" });
      }
    });
  }, []);

  function resizeMnuascriptContainer(element) {
    element.style.width = `${
      (Math.floor(element.parentElement.offsetWidth / 24) - 1) * 24 - 1
    }px`;
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

  return (
    <>
      {!loading ? (
        <Container>
          <h1>당신에게 전하는 말</h1>

          {data.paperMode === undefined ? (
            <OriginalLetterContainer>
              <OriginalLetter className="manuscript">
                <p>{data.text}</p>
              </OriginalLetter>
            </OriginalLetterContainer>
          ) : (
            <Paper modes={data.paperMode} img={data.attachmentUrl}>
              <PaperContent modes={data.paperMode}>
                <LetterText disabled defaultValue={data.text} />
              </PaperContent>
            </Paper>
          )}

          <Link to="/">
            <Button>답장하기</Button>
          </Link>
        </Container>
      ) : (
        <>
          <Main>
            <Loading>
              <CopyRight style={{ fontSize: "30px" }}>
                당신에게 전할 말이 있습니다.
              </CopyRight>
              <ImageLoad image={"../../logo.png"} />
              <CopyRight>
                © 2021 All rights reserved | Made By Yoonhero
              </CopyRight>
              <CopyRight>Logo Designed by Merong</CopyRight>
            </Loading>
          </Main>
          <PlaneCotainer>
            <Paperplane>
              <PlaneRight></PlaneRight>
              <PlaneLeft></PlaneLeft>
              <PlaneBottom></PlaneBottom>
              <PlaneTop></PlaneTop>
              <PlaneMiddle></PlaneMiddle>
            </Paperplane>
          </PlaneCotainer>
        </>
      )}
    </>
  );
}

//http://localhost:3000/card/e5fab4a3-8b49-4074-b39f-2e19ad985137
