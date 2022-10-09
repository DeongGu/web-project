import styled from "styled-components";
import { Link } from "react-router-dom";
import { navigate, useCallback, useState } from "react";
import axios from "axios";

const RegisterForm = (props) => {
  const initialValues = {
    email: "",
    nickName: "",
    password: "",
    checkPassword: "",
  };

  const [user, setUser] = useState(initialValues);

  const { email, nickName, password, checkPassword } = user;

  const isEmail = (email) => {
    const emailReg =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailReg.test(email);
  };

  const isNickname = (nickname) => {
    if (nickname.length >= 2 && nickname.length <= 20) {
      return true;
    } else {
      return false;
    }
  };

  const isPassword = (password) => {
    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return passwordReg.test(password);
  };

  const isSamePassword = (checkPassword) => {
    if (checkPassword === user.password) {
      return true;
    } else {
      return false;
    }
  };

  const validate =
    isEmail(email) &&
    isNickname(nickName) &&
    isPassword(password) &&
    isSamePassword(checkPassword);

  const handleChange = (e) => {
    const newUser = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(newUser);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios
          .post("/register", {
            email,
            password,
            nickName,
          })
          .then((res) => {
            console.log("response:", res);
            navigate("/main");
          });
      } catch (err) {
        console.log(err);
      }
    },
    [email, password, nickName]
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Label htmlFor="email">아이디</Label>
      <StyledInput
        onChange={handleChange}
        value={email}
        type="email"
        name="email"
        id="email"
        required
        placeholder="이메일을 입력하세요"
      ></StyledInput>

      {email ? (
        isEmail(email) ? (
          <Message>올바른 이메일 형식이에요 :)</Message>
        ) : (
          <Message>이메일 형식을 확인해주세요 :(</Message>
        )
      ) : (
        ""
      )}

      <Label htmlFor="nickName">닉네임</Label>
      <StyledInput
        type="text"
        onChange={handleChange}
        value={nickName}
        name="nickName"
        id="nickName"
        required
        placeholder="닉네임은 2~20자 이내여야 합니다."
      ></StyledInput>

      {user.nickName ? (
        isNickname(nickName) ? (
          <Message>올바른 닉네임 형식이에요 :)</Message>
        ) : (
          <Message>2~20자 이내로 작성해주세요^^</Message>
        )
      ) : (
        ""
      )}

      <Label htmlFor="password">비밀번호</Label>
      <StyledInput
        type="password"
        name="password"
        onChange={handleChange}
        value={password}
        id="password"
        required
        placeholder="영문+숫자+특수문자 8~25자 이내여야 합니다."
      ></StyledInput>

      {password ? (
        isPassword(password) ? (
          <Message>안전한 비밀번호에요 :)</Message>
        ) : (
          <Message>
            영문,숫자,특수문자 포함 8~25자 이내로 작성해주세요 ^^
          </Message>
        )
      ) : (
        ""
      )}

      <Label htmlFor="checkPassword">비밀번호 확인</Label>
      <StyledInput
        type="password"
        onChange={handleChange}
        value={checkPassword}
        name="checkPassword"
        id="checkPassword"
        required
      ></StyledInput>

      {checkPassword ? (
        isSamePassword(checkPassword) ? (
          <Message>비밀번호를 동일하게 입력했어요 :)</Message>
        ) : (
          <Message>비밀번호가 틀려요 :( 다시 확인부탁드려요</Message>
        )
      ) : (
        ""
      )}

      <BtnRegister disabled={!validate}>회원가입</BtnRegister>

      <StyledP>
        이미 아이디가 존재하면? <Link to="/login">여기로</Link>
      </StyledP>
    </StyledForm>
  );
};

export default RegisterForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 600px;
  border: 1px solid black;
  margin: 100px auto;
  box-sizing: content-box;
`;

const StyledInput = styled.input`
  margin: 10px 20px;
  height: 30px;
`;

const BtnRegister = styled.button`
  width: 360px;
  height: 50px;
  margin: 30px auto;
  background-color: rgb(83, 151, 223);
  border: none;
  cursor: pointer;
`;

const Label = styled.label`
  margin: 10px 0 0 20px;
`;

const StyledP = styled.p`
  margin-left: 20px;
`;

const Message = styled.p`
  margin: 0 0 0 20px;
  font-size: 12px;
  color: blueviolet;
`;
