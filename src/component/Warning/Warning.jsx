import styled from "styled-components";
import { useBgColor } from "../../contexts/BackgroundColor";

const Warning = ({ active, background, giwaAddOut }) => {
  const bgColor = background;

  return (
    <WarningConain $bgColor={bgColor} $active={active} $giwaAddOut={giwaAddOut}>
      <div>
        <p>
          <em>❌</em>다른 사람이 받은 기와는 볼 수 없다네.
        </p>
      </div>
      <div>
        <p>작성한 글은 잠시 저장되었으니 <br />나가지만 않는다면 이어서 작성할 수 있다네.</p>
      </div>
    </WarningConain>
  );
};

export default Warning;

const WarningConain = styled.div`
  pointer-events: none;
  > div {
    position: absolute;
    top: -13%;
    left: -20%;
    right: 0;
    margin: auto;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    text-align: center;
    padding: 20px 30px;
    border: ${({ $bgColor }) => 
    $bgColor ? "1px solid #ECE0B9" : "1px solid #171A32 "};
    box-shadow: ${({ $bgColor }) =>
    $bgColor ? "5px 5px 15px #ECE0B9" : "5px 5px 15px rgba(23, 26, 50, 0.377)"};
    border-radius: 10px;
    transition: all, .4s ease-in-out;
  }
  > div {
    &:nth-of-type(1) {
      opacity: ${({ $active }) => $active ? 1 : 0};
      z-index: ${({ $active }) => $active ? 5 : 0};
    }
    &:nth-of-type(2) {
      opacity: ${({ $giwaAddOut }) => $giwaAddOut ? 1 : 0};
      z-index: ${({ $giwaAddOut }) => $giwaAddOut ? 5 : 0};
    }
  }
  p {
    color: #222;
    font-family: var(--font-hunmin);
    font-size: 16px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0.16px;
    em {
      margin: 0 5px 0 0;
      font-size: 14px;
    }
  }
`;
