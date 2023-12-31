import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectTitle from "../../SelectTitle/SelectTitle";
import { ReactComponent as Booklet } from "./../../../assets/modal/booklet.svg";
import { ReactComponent as Hat } from "./../../../assets/main/kigHat.svg";
import { englishRegex, fontColorDefault, profanity } from "./WriteGuestText";
import { useDispatch, useSelector } from "react-redux";
import { writeNickName } from "../../../redux/actions/giwaActions";

const NameContain = ({ text, giwaInfo }) => {
  const dispatch = useDispatch();
  const giwaInfoNickname = useSelector((state) => state.giwaReducer);
  const [nickName, setNickName] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  let selectedFont;
  let selectedSort;

  useEffect(() => {
    if (!giwaInfoNickname.nickname) return;

    setNickName(giwaInfoNickname.nickname);
  }, []);

  switch (giwaInfo.font) {
    case 1:
      selectedFont = "Noto Sans KR";
      break;
    case 2:
      selectedFont = "EBS Hunminjeongeum";
      break;
    case 3:
      selectedFont = "Gmarket Sans";
      break;
    default:
      break;
  }

  switch (giwaInfo.sort) {
    case 1:
      selectedSort = "left";
      break;
    case 2:
      selectedSort = "center";
      break;
    case 3:
      selectedSort = "right";
      break;
    default:
      break;
  }

  const checkProfanity = (text) => {
    let censoredText = text;
    profanity.forEach((item) => {
      censoredText = censoredText.replace(item, "아리랑");
    });
    if (text !== censoredText) {
      dispatch(writeNickName(censoredText));
      setNickName(censoredText);
      setIsChecked(
        <span className="profanity">
          이 이름은 어떤가?
          <br />
          전에 있던 이름은 오해의 소지가 있어
          <br />
          보여 내가 바꿔보았다네
        </span>
      );
    }
    return censoredText;
  };

  const handleNickNameBlur = () => {
    const nickNameInput = document.querySelector('#nickNameInput');
    if (nickName !== "") {
      nickNameInput.style.background = "#fff";
    } else {
      nickNameInput.style.background = "#fafafa";
    }
    if (nickName.trim() === "") {
      return;
    }
    if (englishRegex.test(nickName)) {
      dispatch(writeNickName(nickName));
      setIsChecked(
        <span className="english">한글로는 어떻게 불러야 하는가?</span>
      );
      return;
    }
    const censoredText = checkProfanity(nickName);
    if (censoredText === nickName) {
      dispatch(writeNickName(nickName));
      setIsChecked(<span>멋진 이름을 가지고 있구려!</span>);
      return;
    }
  };
  return (
    <NameWrap>
      <Text
        $font={selectedFont}
        $sort={selectedSort}
        $fontColor={fontColorDefault[giwaInfo.fontColor - 1]}
      >
        <Booklet />
        <p>{text}</p>
      </Text>
      <NameInput>
        <SelectTitle
          title={"어떤 호명으로 등록이 되고 싶은가?\n최대 8글자만 사용 가능하다네."}
          weight={500}
        />
        <input
          id="nickNameInput"
          type="text"
          value={nickName}
          onChange={(e) => {
            setIsChecked(false);
            if (e.target.value.length > 8) {
              return;
            }
            setNickName(e.target.value);
          }}
          onBlur={handleNickNameBlur}
        />
        <TextNotification>
          <Hat width={21} height={19} />
          <div>{isChecked ? isChecked : <span>이름이 무엇인가?</span>}</div>
        </TextNotification>
      </NameInput>
    </NameWrap>
  );
};
export default NameContain;

const NameWrap = styled.div`
  width: 100%;
  display: flex;
  margin: 36px 0 45px;
  gap: 45px;
  justify-content: start;
`;

const Text = styled.div`
  width: 573px;
  min-width: 573px;
  min-height: 357px;
  position: relative;
  padding: 50px 30px 50px 40px;
  margin: 0 0 0 27px;
  box-sizing: border-box;
  svg {
    position: absolute;
    left: 0;
    top: 0;
  }
  p {
    height: 250px;
    position: relative;
    padding: 0 10px 0 0;
    color: ${(props) => props.$fontColor};
    text-align: ${(props) => props.$sort};
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    font-family: ${(props) => props.$font};
    overflow-y: auto;
    white-space: pre-line; // 문자열에서 \n 명령어 인식되도록
    span {
      display: block;
    }
    &::-webkit-scrollbar {
      width: 6px;
      background-color: #e6d6b757;
    }
    &::-webkit-scrollbar-thumb {
      height: 30%;
      border-radius: 10px;
      background-color: #bb9266;
    }
  }
`;

const NameInput = styled.div`
  box-sizing: border-box;
  padding: 92px 0 0;
  h2 {
    margin: 0 0 24px 0;
    > span {
      color: #474747;
      font-size: 16px;
      line-height: 23px;
    }
  }
  input {
    width: 275px;
    border-radius: 6px;
    border: 1px solid #e6e6e6;
    color: black;
    font-family: var(--font-hunmin);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    padding: 11px 14px;
    line-height: 22px;
    letter-spacing: 0.64px;
    box-sizing: border-box;
    &:hover,
    &:focus {
      outline: none;
    }
  }
`;

const TextNotification = styled.div`
  margin: 20px 0 0;
  display: flex;
  align-items: start;
  svg {
    min-width: 34px;
  }
  > div {
    margin: 0 0 0 3px;
  }
  span {
    color: #909090;
    font-family: var(--font-hunmin);
    font-size: 15px;
    line-height: 23px;
    font-weight: 300;
    &.english {
      color: var(--btn-main-color);
    }
    &.profanity {
      color: #1748c0;
    }
  }
`;
