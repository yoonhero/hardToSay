import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faCompass,
  faHome,
  faPaperPlane,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

export const Header = () => {
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Icon>
            <Link to="/">
              <Logo>ATC</Logo>
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
