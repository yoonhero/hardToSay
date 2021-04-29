import ScriptTag from "react-script-tag/lib/ScriptTag";
import styled from "styled-components";
import { Header } from "./Header";

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <ScriptTag
        type="text/javascript"
        src="https://developers.kakao.com/sdk/js/kakao.js"
      ></ScriptTag>
      <ScriptTag
        type="text/javascript"
        async
        defer
        crossorigin="anonymous"
        src="https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v10.0&appId=1229700527432801&autoLogAppEvents=1"
        nonce="QHx3svVW"
      ></ScriptTag>
    </>
  );
};

export default Layout;
