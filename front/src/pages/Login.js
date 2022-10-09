import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login = (props) => {
  return (
    <LoginForm>
      <Input type="text" placeholder="이메일 or 전화번호"></Input>
      <Input type="password" placeholder="비밀번호"></Input>
      <BtnLogin type="submit">로그인</BtnLogin>
      <StyledP>
        아직 회원이 아니신가요?
        <Link to="/register"> 회원가입</Link>
      </StyledP>
    </LoginForm>
  );
};

export default Login;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 400px;
  margin: 100px auto;
  border: 1px solid black;
`;

const Input = styled.input`
  height: 30px;
  margin: 10px 50px;
`;

const BtnLogin = styled.button`
  height: 40px;
  margin: 10px 50px;
  cursor: pointer;
`;

const StyledP = styled.p`
  margin-left: 50px;
`;
