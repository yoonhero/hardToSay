import styled from "styled-components";

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
  font-family: "Jua", sans-serif;
  font-weight: 400;
  color: #000;
  &:hover {
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
`;

export { Button };
