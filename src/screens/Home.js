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
import ScriptTag from "react-script-tag";
import ReactToPrint, { useReactToPrint } from "react-to-print";

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
  overflow: hidden;
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

const PaperContent = styled.form`
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
const Input = styled.textarea`
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

  font-size: 20px;
  box-sizing: border-box;
  z-index: 1;
  resize: none;
  color: rgba(0, 0, 0, 0.7);
  @media only screen and (max-width: 580px) {
    width: 70%;
  }
`;

const Btn = styled.button`
  margin-top: 20px;
  background: transparent;
  border: none;
  &:focus {
    outline: 0;
  }
  svg {
    color: #aaaaaa;
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
  font-family: "Nanum", sans-serif;
  font-size: 2rem;
  @media only screen and (max-width: 720px) {
    flex-direction: column;
  }
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

const Add = styled.ins`
  width: 100%;

  div {
    width: 320px;
    height: 100px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
`;

const SendBtn = styled.img`
  max-width: 60px;
  height: auto;
`;

const ChangeModeBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Modes = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
`;

const EditPaperImg = styled.img`
  max-width: 100px;
  height: auto;
  background-color: white;
  border-radius: 10px;
`;

const EditPaper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: #424642;
  div {
    padding: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    background-color: #f7f6e7;
    border-radius: 10px;
    margin-right: 20px;
    &:hover {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    p {
      font-size: 15px;
    }
  }
  label {
    padding: 4px;
    background-color: #f7f6e7;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-radius: 10px;
    &:hover {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    p {
      font-size: 15px;
    }
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
  flex-direction: column;
  padding: 20px;
  @media only screen and (max-width: 720px) {
    flex-direction: row;
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
  const componentRef = useRef();

  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init("e3c92ffffb511df88984ed733797f4df");
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "그전까지 전하기 어려웠던 말들",
          description:
            "당신에게 전할 말이 있습니다. 평소 전하기 어려웠던 말들을 해봅니다. 여러분도 평소 고마운 사람에게 고마운 마음을 표현하지 못했다면 표현해보세요. ",
          imageUrl: "https://hardtosay.netlify.app/saying.png", // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: "https://hardtosay.netlify.app/card/" + url,
            webUrl: "https://hardtosay.netlify.app/card/" + url,
          },
        },

        buttons: [
          {
            title: "당신에게 전하는 말",
            link: {
              mobileWebUrl: "https://hardtosay.netlify.app/card/" + url,
              webUrl: "https://hardtosay.netlify.app/card/" + url,
            },
          },
        ],
      });
    }
  }, []);
  const onValid = async () => {
    newAudio.play();
    const { card_text } = getValues();
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
              <div onClick={handlePrint}>
                <FontAwesomeIcon icon={faPrint} />
              </div>
            </Modes>
            {editPaper ? (
              <EditPaper style={{ padding: "20px" }}>
                <div onClick={() => setPaperMode(1)}>
                  <EditPaperImg src="./letter1.png" />
                  <p>normal</p>
                </div>
                <div onClick={() => setPaperMode(2)}>
                  <EditPaperImg src="./letter2.png" />
                  <p>yellow</p>
                </div>
                <label for="file-input" onClick={() => setPaperMode(3)}>
                  <EditPaperImg src="./letter3.png" />
                  <p>custom</p>
                </label>
              </EditPaper>
            ) : null}
            <Paper
              onSubmit={handleSubmit(onValid)}
              modes={paperMode}
              img={customPaperImg}
              ref={componentRef}
            >
              <PaperContent>
                <Input
                  placeholder="Write something ..."
                  name="card_text"
                  ref={register({ required: true })}
                  modes={paperMode}
                />
              </PaperContent>
            </Paper>
            <Btn onClick={handleSubmit(onValid)}>
              {/* <FontAwesomeIcon icon={faPaperPlane} size="2x" /> */}
              <SendBtn src="./letter.png" />
            </Btn>
            <Question onClick={() => setIsOpen(true)}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </Question>

            <Add
              style={{ marginTop: "8rem" }}
              className="kakao_ad_area"
              data-ad-unit="DAN-4WYhQChSKcROPiKD"
              data-ad-width="320"
              data-ad-height="100"
            ></Add>
            <Add
              style={{ marginBottom: "8rem" }}
              className="kakao_ad_area"
              data-ad-unit="DAN-OHeaa7pv4R6Uhxjj"
              data-ad-width="320"
              data-ad-height="100"
            ></Add>
          </Main>
        ) : (
          <Main>
            <FontAwesomeIcon icon={faSpinner} size="3x" pulse />
          </Main>
        )
      ) : (
        <>
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
            <Share className="kakao-share-button">
              <ShareBtn id="kakao-link-btn">
                <img src="./kakao.png" />
              </ShareBtn>
              <ShareBtn
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=https://hardtosay.netlify.app/card/${url}`
                  )
                }
              >
                <img src="./facebook.png" />
              </ShareBtn>
            </Share>
          </Card>
        </>
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
      <ScriptTag
        type="text/javascript"
        src="//t1.daumcdn.net/kas/static/ba.min.js"
        async
      ></ScriptTag>
    </>
  );
}
