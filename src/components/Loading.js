import styled from "styled-components";

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

const Loading = styled.div`
  font-family: "Jua", sans-serif;
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

export { CopyRight, Loading };
