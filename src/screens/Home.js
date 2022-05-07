import {
  faArrowCircleRight,
  faCheck,
  faPaperPlane,
  faPrint,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../fbase";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  faCheckCircle,
  faEdit,
  faQuestionCircle,
} from "@fortawesome/free-regular-svg-icons";
import Modal from "react-modal";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { shareKakao } from "../shareKakao";
import { ImageLoad } from "../components/ImageLoad";
import emailjs, { init } from "emailjs-com";
import { LetterText, Paper, PaperContent } from "../components/Letter";

const Main = styled.main`
  width: 100%;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Btn = styled.button`
  margin-top: 20px;
  background: transparent;
  border: none;
  transform: transition 0.7s linear;
  &:hover {
    transform: scale(1.2);
  }
  &:focus {
    outline: 0;
  }
  svg {
    color: #aaaaaa;
  }
  img {
    max-width: 60px;
    height: auto;
  }
`;

const PostPaper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 400px;
  min-width: 325px;
  min-height: 175px;
  background: #ffed87;
  box-shadow: 3px 3px 2px var(--paper-shadow);
  transform: rotate(10deg);
  transform-origin: top left;

  p {
    font-size: 20px;
    margin: auto;
    max-width: 80%;
    font-weight: 500;
  }
`;
const Pin = styled.div`
  position: absolute;
  left: 20px;
  width: 60px;
  height: 50px;
`;
const Shadow = styled.div`
  position: absolute;
  top: 18px;
  left: -8px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: radial-gradient(var(#c9bf8d), 20%, rgba(201, 191, 141, 0));
`;
const Metal = styled.div`
  position: absolute;
  width: 5px;
  height: 20px;
  background: linear-gradient(to right, #808080, 40%, #eae8e8, 50%, #808080);
  border-radius: 0 0 30% 30%;
  transform: rotate(50deg);
  transform-origin: bottom left;
  top: 15px;
  border-bottom: 1px solid #808080;
`;
const BottomCircle = styled.div`
  position: absolute;
  right: 15px;
  width: 35px;
  height: 35px;
  border-radius: 50%;

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: -10px;
    width: 20px;
    height: 30px;
    transform: rotate(55deg);
    transform-origin: 100% 100%;
    border-radius: 0 0 40% 40%;
    background: red;
  }

  &::after {
    content: "";
    position: absolute;
    right: -5px;
    top: -5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: red;
  }
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  padding: 10vmin;
  font-family: "Jua", sans-serif;
  font-size: 2rem;
`;

const Text = styled.p`
  font-size: 15px;
  color: #69697c;
  max-width: 80%;
  word-wrap: break-word;
`;

const Question = styled.div`
  margin-top: 20px;
  svg {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const CopyText = styled.div`
  position: absolute;
  color: #32c232;
  font-size: 20px;

  transform: rotate(10deg);
`;

const Page = styled.div`
  position: relative;
  padding: 20px;
  max-width: 580px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  img {
    max-width: 90%;
    max-height: 400px;
    border-radius: 20px;
  }
  div p {
    margin-top: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
    color: #665f5f;
    max-width: 80%;
    font-weight: 500;
    font-size: 22px;

    word-wrap: break-word;
  }
`;

const NextButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  &:focus {
    outline: 0;
  }
  svg {
    color: #aaaaaa;
    font-size: 30px;
  }
  right: 0;
`;
const PreviousButton = styled.button`
  position: absolute;

  background: transparent;
  border: none;
  &:focus {
    outline: 0;
  }
  svg {
    color: #aaaaaa;
    font-size: 30px;
  }
  left: 0;
`;
const CloseButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  &:focus {
    outline: 0;
  }
  svg {
    color: #aaaaaa;
    font-size: 30px;
  }
  top: 0;
  right: 0;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "#f4f9f9",
    borderRadius: "20px",
  },
};

// const SendBtn = styled.img`
//   max-width: 60px;
//   height: auto;
// `;

// const ChangeModeBtn = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   margin-right: 10px;
// `;

const Modes = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: flex-end;
  padding: 10px 80px;
  @media only screen and (max-width: 780px) {
    padding: 10px 20px;
  }
`;

// const EditPaperImg = styled.img`
//   max-width: 100px;
//   height: auto;
//   background-color: white;
//   border-radius: 10px;
// `;

const EditPaperContainer = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: #f8f5f1;

  display: flex;
  border: 2px solid rgb(219, 219, 219);
  border-radius: 50%;
  overflow: hidden;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transform: scale(1.2);
  }
  p {
    font-size: 15px;
    padding: 6px;
  }
  img {
    width: 80px;
    height: 80px;
    background-color: white;
  }
`;

const EditPaperLabel = styled.label`
  background-color: #f8f5f1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  display: flex;
  border: 2px solid rgb(219, 219, 219);
  border-radius: 50%;
  overflow: hidden;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transform: scale(1.2);
  }
  p {
    font-size: 15px;
    padding: 6px;
  }
  img {
    width: 80px;
    height: 80px;
    background-color: white;
    background-color: white;
  }
`;

const EditPaper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  color: #424642;
  padding: 20px 80px;
  @media only screen and (max-width: 780px) {
    padding: 20px;
  }
`;

const EditIcon = styled.div`
  margin-right: 20px;
  svg {
    font-size: 15px;
  }
`;
const Share = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 20px;
  @media only screen and (max-width: 720px) {
    padding: 30px;
  }
`;
const ShareBtn = styled.button`
  max-width: 50px;
  background: inherit;
  border: none;
  img {
    max-width: 100%;
  }
`;

const SendToContainer = styled.div`
  padding: 20px;
  font-family: "Jua", sans-serif;
  margin-top: 20px;
  h1 {
    font-size: 18px;
    padding: 10px;
  }
  @media only screen and (max-width: 780px) {
    padding: 0;
  }
`;

const SendTo = styled.div`
  display: flex;

  justify-content: center;
  flex-direction: row;
  div {
  }
`;

const SendToSelectBtn = styled.div`
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  outline: none;
  font-weight: 400;
  font-family: "Jua", sans-serif;
  color: ${(props) => (props.selected ? "#fff" : "#132c33")};
  background-color: ${(props) => props.selected && "#2ee59d"};
  &:hover {
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
    h3 {
      color: #fff;
    }
  }
  h3 {
    color: #51c4d3;
    @media only screen and (max-width: 520px) {
      font-size: 10px;
    }
  }
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;

  img {
    max-width: 100px;
    width: 100%;
    border-radius: 10px;
    @media only screen and (max-width: 520px) {
      max-width: 80px;
    }
  }
  p {
    padding: 10px;
    font-weight: 400;
    @media only screen and (max-width: 520px) {
      font-size: 10px;
    }
  }
  @media only screen and (max-width: 520px) {
    margin: 4px;
  }
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

const Print = styled.div`
  @media only screen and (max-width: 580px) {
    display: none;
  }
`;

const Email = styled.input`
  /* padding: 10px;
  border: 1px solid #000;
  background-color: #f4f9f9;
position: absolute;

border-radius: 10px;
bottom:10px;
right: 10px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
&:focus{
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
} */
  border: 0;

  border-bottom: 2px solid #555;
  background: transparent;
  width: 100%;
  padding: 8px 0 5px 0;
  font-size: 17px;
  color: #424642;
  &:focus {
    border: none;
    outline: none;
    border-bottom: 2px solid #e74c3c;
  }
`;

const InputContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  label {
    position: absolute;
    top: 10px;
    left: 0px;
    font-size: 16px;
    color: #424642;
    pointer-event: none;
    transition: all 0.5s ease-in-out;
  }
  input:focus ~ label,
  input:valid ~ label {
    top: -15px;
    font-size: 15px;
    transform: scale(30%);
  }
`;

const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  }
  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};

export default function Home() {
  const newAudio = new Audio("./sendmusic.mp3");
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [paperMode, setPaperMode] = useState(1);
  const [customPaperImg, setPaperImg] = useState("");
  const [editPaper, setEditPaper] = useState(false);
  const [sendTo, setSendTo] = useState(1);
  const componentRef = useRef();
  const triggerNotif = useNotification("그전까지 전하지 못했던 말들", {
    body: "당신의 편지가 저장되었습니다. 링크를 복사해 고마운 사람에게 보내보세요.",
    icon: "./logo.png",
  });

  useEffect(() => {
    init("user_kgeKh4BvSxtvktGIWoUNv");
  }, []);

  const onValid = async () => {
    // triggerNotif();
    newAudio.play();
    const { card_text, email } = getValues();
    let random_url = uuidv4();
    setUrl(random_url);
    let attachmentUrl = "";
    if (customPaperImg !== "" && paperMode === 3) {
      const attachmentRef = storageService.ref().child(`${random_url}`);
      const response = await attachmentRef.putString(
        customPaperImg,
        "data_url"
      );
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const cardObj = {
      text: card_text,
      paperMode: paperMode,
      createdAt: Date.now(),
      attachmentUrl,
    };
    setLoading(true);
    await dbService.collection("cards").doc(random_url).set(cardObj);
    setLoading(false);
    setFinished(true);
    if (email !== "") {
      emailjs.send("service_0cpyre9", "template_hcgdjnr", {
        from_name: "고마웠던 사람",
        to_name: "고마운 사람",
        message:
          card_text +
          "    " +
          `https://hardtosay.netlify.app/card/${random_url}`,
        reply_to: email,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  const NextPage = () => {
    if (page < 2) {
      setPage(page + 1);
    } else {
      setPage(0);
    }
  };
  const PreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    } else {
      setPage(2);
    }
  };
  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { files },
    } = event;
    if (files.length === 0) {
      return;
    }
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setPaperImg(result);
    };
    reader.readAsDataURL(theFile);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {!finished ? (
        !loading ? (
          <Main>
            <Modes>
              <EditIcon onClick={() => setEditPaper(!editPaper)}>
                <FontAwesomeIcon icon={editPaper ? faTimes : faEdit} />
              </EditIcon>
              <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                onChange={onChange}
                accept="image/*"
              />
              {/* <div>
                <p onClick={onPrint}>인쇄</p>
              </div> */}
              <Print onClick={handlePrint}>
                <FontAwesomeIcon icon={faPrint} />
              </Print>
            </Modes>
            {editPaper ? (
              <>
                <EditPaper>
                  <EditPaperContainer onClick={() => setPaperMode(1)}>
                    <ImageLoad image={"./letter1.png"} />
                  </EditPaperContainer>
                  <EditPaperContainer onClick={() => setPaperMode(2)}>
                    <ImageLoad image={"./letter2.png"} />
                  </EditPaperContainer>
                  <EditPaperLabel
                    for="file-input"
                    onClick={() => setPaperMode(3)}
                  >
                    <ImageLoad image={"./letter3.png"} />
                  </EditPaperLabel>
                </EditPaper>
                {/* <div>
                  <button>change fonts</button>
                </div> */}
              </>
            ) : null}
            <Paper
              onSubmit={handleSubmit(onValid)}
              modes={paperMode}
              img={customPaperImg}
              ref={componentRef}
            >
              <PaperContent>
                <LetterText
                  placeholder="Write something ..."
                  name="card_text"
                  ref={register({ required: true })}
                  modes={paperMode}
                />
              </PaperContent>
              {/* <InputContainer>
                <Email
                  type="mail"
                  name="email"
                  placeholder="email"
                  ref={register({ required: false })}
                />
                <label>이메일로 편지 전달</label>
              </InputContainer> */}
            </Paper>

            <SendToContainer>
              <h1>누구에게 보내나요?</h1>
              <SendTo>
                <SendToSelectBtn
                  selected={sendTo === 1}
                  onClick={() => setSendTo(1)}
                >
                  <ImageLoad image={"./saying1.png"} />
                  <p>고마운분에게</p>
                  {/* {sendTo === 1 ? <h3>선택됨</h3> : null} */}
                </SendToSelectBtn>
                <SendToSelectBtn
                  selected={sendTo === 2}
                  onClick={() => setSendTo(2)}
                >
                  <ImageLoad image={"./saying2.png"} />

                  <p>부모님께</p>
                  {/* {sendTo === 2 ? <h3>선택됨</h3> : null} */}
                </SendToSelectBtn>
                <SendToSelectBtn
                  selected={sendTo === 3}
                  onClick={() => setSendTo(3)}
                >
                  <ImageLoad image={"./saying3.png"} />
                  <p>연인에게</p>
                  {/* {sendTo === 3 ? <h3>선택됨</h3> : null} */}
                </SendToSelectBtn>
                <SendToSelectBtn
                  selected={sendTo === 4}
                  onClick={() => setSendTo(4)}
                >
                  <ImageLoad image={"./saying4.png"} />

                  <p>선생님께</p>
                  {/* {sendTo === 4 ? <h3/>선택됨</h3> : null} */}
                </SendToSelectBtn>
              </SendTo>
            </SendToContainer>

            <Btn onClick={handleSubmit(onValid)}>
              {/* <FontAwesomeIcon icon={faPaperPlane} size="2x" /> */}
              <ImageLoad image={"./letter.png"} />
            </Btn>

            {/* <Question onClick={() => setIsOpen(true)}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </Question> */}
            <CopyRightContainer>
              <CopyRight>
                © 2021 All rights reserved | Made By{" "}
                <a
                  href="https://www.youtube.com/channel/UCLRcC3qP9gi5l1QUxBqHGjw"
                  target="__blank"
                >
                  Yoonhero 🚀
                </a>
              </CopyRight>
            </CopyRightContainer>
          </Main>
        ) : (
          <Main>
            {/* <FontAwesomeIcon icon={faSpinner} size="3x" pulse /> */}
            <Loading>
              <ImageLoad image={"./logo.png"} />
              <CopyRight>
                © 2021 All rights reserved | Made By Yoonhero
              </CopyRight>
              <CopyRight>Logo Designed by Merong</CopyRight>
              <LoadingIcon>
                <FontAwesomeIcon icon={faSpinner} size="3x" pulse />
              </LoadingIcon>
            </Loading>
          </Main>
        )
      ) : (
        <div>
          <Card>
            <PostPaper>
              <Pin>
                <Shadow></Shadow>
                <Metal></Metal>
                <BottomCircle></BottomCircle>
              </Pin>

              <CopyToClipboard text={document.location.href + "card/" + url}>
                <Text onClick={() => setCopied(true)}>
                  {document.location.href + "card/" + url}
                </Text>
              </CopyToClipboard>
            </PostPaper>
            {copied ? (
              <CopyText>
                <FontAwesomeIcon icon={faCheck} />
                Copied
              </CopyText>
            ) : null}
          </Card>
          <Share>
            <ShareBtn
              onClick={() => {
                shareKakao(url, sendTo);
              }}
            >
              <ImageLoad image={"./kakao.png"} />
            </ShareBtn>
            <ShareBtn
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=https://hardtosay.netlify.app/card/${url}`
                )
              }
            >
              <ImageLoad image={"./facebook.png"} />
            </ShareBtn>
          </Share>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="사용법"
      >
        <Page>
          {page === 0 ? (
            <div>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1595452767427-0905ad9b036d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cXVlc3Rpb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              />
              <p>
                우리 곁에 있는 소중한 사람들에게 고맙다고 감사하다고 말한적
                있나요?
              </p>
            </div>
          ) : page === 1 ? (
            <div>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1549032305-e816fabf0dd2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8dGhhbmslMjB5b3V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              />
              <p>우리는 그 고마움을 알지만 말하지 않고 있을지도 모릅니다.</p>
            </div>
          ) : (
            <div>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1566125882500-87e10f726cdc?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bGV0dGVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              />

              <p>
                직접 말하지 못했던 말들을 여기서 해보세요!! 고맙다는 말을
                해봐요!!
              </p>
            </div>
          )}
          <PreviousButton onClick={PreviousPage}>
            <FontAwesomeIcon icon={faArrowCircleRight} rotation={180} />
          </PreviousButton>
          <NextButton onClick={NextPage}>
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </NextButton>

          <CloseButton onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </Page>
      </Modal>
    </>
  );
}
