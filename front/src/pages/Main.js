import React from "react";
import { Link } from "react-router-dom";

const Main = (props) => {
  return (
    <>
      <h1>여기는 메인페이지입니다.</h1>
      <ul>
        <Link to="/prolog">
          <li>소개</li>
        </Link>
        <Link to="/login">
          <li>로그인</li>
        </Link>
      </ul>
    </>
  );
};

export default Main;
