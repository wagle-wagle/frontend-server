import { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function ValidTest({ name, value, password }) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 유효성 검사를 통한 문구 출력

  // input값이 비어있는지 아닌지를 판단
  useEffect(() => {
    if (value === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [value]);

  useEffect(() => {
    // email 유효성 검사
    if (name === "userId") {
      const emailRegex = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/;
      emailRegex.test(value) ? setIsEmail(true) : setIsEmail(false);
      return;
    }

    // password 유효성 검사
    if (name === "password") {
      const passwordRegex =
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{6,16}$/;
      // 입력한 password가 정규식에 만족하는지 확인
      passwordRegex.test(value) ? setIsPassword(true) : setIsPassword(false);
      return;
    }

    if (name === "checkPassword") {
      value === password
        ? setIsPasswordConfirm(true)
        : setIsPasswordConfirm(false);
      return;
    }
  }, [name, value]);

  return (
    <Container>
      {/* 삼항연산자를 사용했는데 다른 방법이 있는지 찾와봐야할듯 */}
      {/* email 부분 */}
      {name === "userId" ? (
        !isEmpty ? (
          isEmail ? (
            <IsTrue>유효한 이메일입니다.</IsTrue>
          ) : (
            <IsFalse>유효하지 않은 이메일입니다.</IsFalse>
          )
        ) : null
      ) : null}
      {/* password부분 */}
      {name === "password" ? (
        !isEmpty ? (
          isPassword ? (
            <IsTrue>유효한 비밀번호입니다.</IsTrue>
          ) : (
            <IsFalse>유효하지 않은 비밀번호입니다.</IsFalse>
          )
        ) : (
          <CheckInfo>
            <span>* </span>
            6~16자, 영문 대.소문자, 숫자, 특수문자 중 2개 이상 사용하세요.
          </CheckInfo>
        )
      ) : null}
      {/* password 비교 부분 */}
      {name === "checkPassword" ? (
        !isEmpty ? (
          isPasswordConfirm ? (
            <IsTrue>비밀번호가 일치합니다.</IsTrue>
          ) : (
            <IsFalse>비밀번호가 일치하지 않습니다.</IsFalse>
          )
        ) : null
      ) : null}
    </Container>
  );
}

const Container = styled.div``;

const IsTrue = styled.span`
  color: green;
  font-size: 16px;
`;

const IsFalse = styled.span`
  color: red;
  font-size: 16px;
`;

const CheckInfo = styled.span`
  display: block;
  color: #9e9e9e;
  font-family: Noto Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  > span {
    color: #e75852;
  }
`;