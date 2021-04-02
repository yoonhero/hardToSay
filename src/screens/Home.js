import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { dbService } from "../fbase";
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
  background: #fafafa;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 60px;
    background: radial-gradient(#575450 6px, transparent 7px) repeat-y;
    background-size: 30px 30px;
    border-right: 3px solid #d44147;
    box-sizing: border-box;
  }
`;

const PaperContent = styled.form`
  position: absolute;
  top: 30px;
  right: 0;
  bottom: 30px;
  left: 60px;
  background: linear-gradient(transparent, transparent 28px, #91d1d3 28px);
  background-size: 30px 30px;
`;
const Input = styled.textarea`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  line-height: 30px;
  padding: 0 10px;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 400;
  font-weight: bold;
  font-size: 18px;
  box-sizing: border-box;
  z-index: 1;
  resize: none;
  color: rgba(0, 0, 0, 0.7);
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
  max-width:400px;
  min-width: 325px;
  min-height: 175px;
  background: #ffed87;
  box-shadow: 3px 3px 2px var(--paper-shadow);
  transform: rotate(10deg);
  transform-origin: top left;

  p{
    font-size: 20px;
    margin: auto;
    max-width: 80%;
    font-weight: 500;
  }
`
const Pin = styled.div`
    position: absolute;
  left: 20px;
  width: 60px;
  height: 50px;
`
const Shadow = styled.div`
    position: absolute;
  top: 18px;
  left: -8px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: radial-gradient(var(#c9bf8d), 20%, rgba(201, 191, 141, 0));
  `
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
  `
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
    left:-10px;
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
`

const Card = styled.div`
  display: flex;
  justify-content: center;
  padding: 10vmin;
  font-family: "Nanum", sans-serif;
  font-size: 2rem;
`

const Text = styled.p`
  font-size: 15px;
  color: #69697c;
`


export default function Home() {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [url, setUrl] = useState("")
  const onValid = async () => {
    const { card_text } = getValues();
    let random_url = uuidv4();
    setUrl(random_url)
    const cardObj = {
      text: card_text,
      createdAt: Date.now(),
    };
    setLoading(true)
    await dbService.collection("cards").doc(random_url).set(cardObj);
    setLoading(false)
    setFinished(true)
  };


  return (
    <>
      {!finished ? !loading ?
        <Main>
          <Paper onSubmit={ handleSubmit(onValid) }>
            <PaperContent>
              <Input
                placeholder='Write something ...'
                name='card_text'
                ref={ register({ required: true }) }
              />
            </PaperContent>
          </Paper>
          <Btn onClick={ handleSubmit(onValid) }>
            <FontAwesomeIcon icon={ faPaperPlane } size='2x' />
          </Btn>
        </Main> : <Main>
          <FontAwesomeIcon icon={ faSpinner } size="3x" pulse />
        </Main>
        : <Card>
          <PostPaper>
            <Pin>
              <Shadow></Shadow>
              <Metal></Metal>
              <BottomCircle></BottomCircle>

            </Pin>


            <CopyToClipboard text={ document.location.href + "card/" + url }>
              <Text>{ document.location.href + "card/" + url }</Text>
            </CopyToClipboard>


          </PostPaper>
        </Card>
      }
    </>
  )
}
