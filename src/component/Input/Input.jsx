import { styled } from "styled-components";
import useInput from "../../hooks/useInput";
import { ReactComponent as UserIcon } from "../../assets/octicon-person-24.svg";
import { ReactComponent as PasswordIcon } from "../../assets/icons-8-lock-2.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/humbleicons-eye-close.svg";
import { ReactComponent as OpendEyeIcon } from "../../assets/fluent-eye-12-filled.svg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ValidTest from "../ValidTest/ValidTest";

export default function Input({
  icon,
  updateForm,
  name,
  type,
  password,
  ...rest
}) {
  const location = useLocation().pathname;
  const [input, setInput] = useInput("");
  const [isFocus, setIsFocus] = useState(false);
  const [passwordShowing, setPasswordShowing] = useState(false);
  const onFocusChange = () => {
    setIsFocus((isFocus) => !isFocus);
  };

  useEffect(() => {
    updateForm(name, input);
  }, [name, input]);

  return (
    <Container>
      <InputDiv location={location}>
        {/* switch문을 통해서 icon값들에 맞는 icon추가 */}
        {(() => {
          switch (icon) {
            case "User":
              return <UserIcon fill={isFocus ? "#E75852" : "#BDBDBD"} />;
            case "Password":
              return <PasswordIcon fill={isFocus ? "#E75852" : "#BDBDBD"} />;
            default:
              break;
          }
        })()}
        <input
          {...rest}
          type={
            type !== "password" ? type : passwordShowing ? "text" : "password"
          }
          value={input}
          onFocus={onFocusChange}
          onBlur={onFocusChange}
          onChange={setInput}
          name={name}
          required
        />
        {location === "/join" && icon === "Password" ? (
          <EyeIconBtn
            onClick={() =>
              setPasswordShowing((passwordShowing) => !passwordShowing)
            }
          >
            {passwordShowing ? <OpendEyeIcon /> : <ClosedEyeIcon />}
          </EyeIconBtn>
        ) : null}
      </InputDiv>
      {location === "/join" && (
        <ValidTest
          name={name}
          value={input}
          location={location}
          password={password}
        />
      )}
    </Container>
  );
}

const Container = styled.div``;

const InputDiv = styled.div`
  width: 438px;
  height: 64px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background-color: #fafafa;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-top: ${(props) => (props.location === "/join" ? "20px" : null)};
  margin-bottom: ${(props) => (props.location === "/login" ? "5px" : null)};
  &:focus-within {
    border: 1px solid #e75852;
    background-color: #fff;
  }
  > input {
    width: 100%;
    font-size: 18px;
    height: fit-content;
    border: none;
    background: none;
    margin-left: 10px;
    color: #222;
    font-family: "Noto Sans KR";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.64px;
    &::placeholder {
      color: #bdbdbd;
    }
    &:focus {
      outline: none;
      color: #222;
      font-family: Noto Sans KR;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.64px;
      &::placeholder {
        color: #e75852;
      }
    }
  }
`;

const EyeIconBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
`;