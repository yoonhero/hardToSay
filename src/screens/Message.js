import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { dbService } from "../fbase";
import styled from "styled-components";

const ManuScript = styled.div`
  font-family: "MapoBackpacking", serif;
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
  var docRef = dbService.collection("cards").doc(id);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        setData(doc.data().text);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  function resizeMnuascriptContainer(element) {
    element.style.width = `${
      (Math.floor(element.parentElement.offsetWidth / 24) - 1) * 24 - 1
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
  useEffect(() => {
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
  }, [data]);
  return (
    <Container>
      <h1>당신에게 전하는 말</h1>
      <ManuScriptContainer>
        <ManuScript className="manuscript">
          <p>{data}</p>
        </ManuScript>
      </ManuScriptContainer>
    </Container>
  );
}
