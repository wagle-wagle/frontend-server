import React from "react";
import styled from "styled-components";
import NavBar from "../../component/NavBar/NavBar";
import { Link } from "react-router-dom";
import { ReactComponent as Kakao } from "../../assets/common/kakao.svg";
import { ReactComponent as VisitIcon } from "../../assets/common/visit_icon.svg";
import MobilePopup from "../../component/MobilePopup/MobilePopup";
import { Mobile } from "../../style/mediaQuery";
import { useSelector } from "react-redux";

const Setting = () => {
  const userInfo = useSelector((state) => state.userReducer);

  return (
    <>
      <Mobile>
        {/* pc 최적화 팝업 start */}
        <MobilePopup />
        {/* pc 최적화 팝업 end */}
      </Mobile>
      <NavBar />
      <Main>
        <Contain>
          <div>
            <Title>
              <span>{userInfo.username}</span>님, <br />
              안녕하시오.
            </Title>
            <JoinEmeil>
              {userInfo.memberType == "KAKAO" ? (
                <Kakao />
              ) : (
                <span>{userInfo.email}</span>
              )}
            </JoinEmeil>
          </div>
          <div>
            <NavCont>
              <Link to="/MyPage">마이페이지</Link>
              <VisitIcon />
              <b>설정</b>
            </NavCont>
            <NavWrap>
              {userInfo.memberType === "GENERAL" ? (
                <li>
                  <Link to="/confirmPwd">
                    <b>비밀번호 변경</b>
                    <em>&gt;</em>
                  </Link>
                </li>
              ) : null}
              <li>
                <Link to="/Withdrawal">
                  <b>회원 탈퇴</b>
                  <em>&gt;</em>
                </Link>
              </li>
            </NavWrap>
          </div>
        </Contain>
      </Main>
    </>
  );
};

export default Setting;

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.device.mobile} {
    width: 100vw;
    overflow: hidden;
  }
`;

const Contain = styled.div`
  width: 990px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.strong`
  color: #222;
  font-family: var(--font-hunmin);
  font-size: 46px;
  line-height: 60px;
  font-weight: 600;
  span {
    color: #e75852;
  }
`;

const JoinEmeil = styled.strong`
  padding: 28px 0 0;
  display: flex;
  align-items: center;
  > svg {
    margin: 0 10px 0 0;
  }
  span {
    color: #9e9e9e;
    font-size: 22px;
    font-weight: 400;
  }
`;

const NavCont = styled.div`
  display: flex;
  align-items: center;
  > a,
  b {
    color: #616161;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.2px;
  }
  b {
    font-weight: 500;
  }
  > svg {
    margin: 0 17px;
    path {
      stroke: #616161;
    }
  }
`;

const NavWrap = styled.ul`
  margin: 40px 0 0;
  li {
    width: 520px;
    font-family: var(--font-hunmin);
    border-bottom: 1px solid #e0e0e0;
    a {
      width: 100%;
      height: 100%;
      display: block;
      position: relative;
      padding: 34px 0 34px 10px;
      &:hover {
        span {
          color: #e75852;
        }
        b {
          color: #e75852;
        }
      }
    }
    span {
      font-size: 28px;
      color: #000;
      transition: color, 0.2s ease-in-out;
    }
    b {
      margin: 0 0 0 10px;
      color: #000;
      font-size: 28px;
      font-weight: 400;
      transition: color, 0.2s ease-in-out;
    }
    em {
      height: fit-content;
      position: absolute;
      color: #000;
      font-family: var(--font-hunmin);
      font-size: 24px;
      font-weight: 400;
      right: 30px;
      margin: auto;
      bottom: 0;
      top: 0;
    }
  }
`;
