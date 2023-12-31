import { keyframes, styled } from "styled-components";
import { ReactComponent as GnbFooter } from "../../assets/gnb/gnb-footer.svg";
import { ReactComponent as MenuBtn } from "../../assets/gnb/ic_baseline_menu.svg";
// import { ReactComponent as ArrowBtn } from "../../assets/Feather Icon.svg";
import { ReactComponent as ArrowBtn } from "../../assets/common/visit_icon.svg";
import { ReactComponent as MenuXBtn } from "../../assets/common/x-menu.svg";
import { ReactComponent as Logo } from "../../assets/common/logo_txt.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { removeItem } from "../../utils/storage";

export default function NavBar({ isShowing = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // 임시코드(로그인된 유저정보를 로컬스토리지에서 불러옴)
  // const userInfo = JSON.parse(localStorage.getItem("loggedInUser"));
  // const userName = !(userInfo === null) ? userInfo.name : "";
  // 위 코드를 리덕스로 바꾼 부분이 아래부분입니다.
  const userInfo = useSelector((state) => state.userReducer);
  const userName = userInfo.username;

  const menuBtnClick = () => {
    setMenuOpen((menuOpen) => !menuOpen);
  };

  // 임시코드(로그아웃/로컬스토리지에 저장되어있는 로그인정보를 지움)
  const logoutBtnClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    removeItem("AUTH");
    removeItem("USERINFO");
    removeItem("autoLogin");
    setIsLogin(false);
    navigate("/login");
  };

  useEffect(() => {
    setIsLogin(userInfo.loggedIn);
  }, [userInfo.loggedIn]);

  useEffect(() => {
    if (!isShowing) {
      setMenuOpen(false);
    }
  }, [isShowing]);

  const handleGoToUnius = () => {
    window.open(
      "https://www.notion.so/Intro-1db7a52c5a9f4e899f17ef620c63678b",
      "_blank"
    );
  };

  const handleGoToInsta = () => {
    window.open(
      "https://instagram.com/wa_gle.1009?igshid=OGQ5ZDc2ODk2ZA==",
      "_blank"
    );
  };

  const handleLogoClick = () => {
    navigate("/main");
    return;
  };

  return (
    <Nav className={isShowing ? null : "no-showing"}>
      <NavLogo onClick={handleLogoClick}>와글와글</NavLogo>
      <NavMenu>
        <NavMenuTop>
          {menuOpen ? (
            <StyledMenuXBtn
              onClick={menuBtnClick}
              fill="white"
              width={32}
              height={32}
            />
          ) : (
            <StyledMenuBtn onClick={menuBtnClick} />
          )}
        </NavMenuTop>
        <NavMenuMiddle $menuOpen={menuOpen} $isLogin={isLogin}>
          <MyInfo>
            <MyInfoItemFirst>
              {isLogin ? (
                <p>
                  안녕하신가
                  <br />
                  <span>{userInfo.username}</span>님.
                </p>
              ) : (
                <Link to="/login">
                  로그인하세요
                  <ArrowBtn width={11} height={12} />
                </Link>
              )}
            </MyInfoItemFirst>
            <MyInfoItem>
              <LinkMypage to="/myPage" $isLogin={isLogin}>
                마이페이지
              </LinkMypage>
              <StyledLink onClick={handleGoToUnius}>유니어스 소개</StyledLink>
              <StyledLink onClick={handleGoToInsta}>문의하기</StyledLink>
            </MyInfoItem>
            {isLogin && (
              <MyInfoItem>
                <LogoutBtn onClick={logoutBtnClick}>로그아웃</LogoutBtn>
              </MyInfoItem>
            )}
          </MyInfo>
        </NavMenuMiddle>
        <NavMenuBottom>
          <GnbFooter />
        </NavMenuBottom>
      </NavMenu>
    </Nav>
  );
}

const Nav = styled.nav`
  width: 100%;
  /* height: 120px; */
  display: flex;
  /* align-items: center; */
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: 100;
  transition: all ease-in-out 1s;
  &.no-showing {
    top: -150px;
    opacity: 0;
  }
  @media ${(props) => props.theme.device.mobile} {
    display: none;
  }
`;

const NavLogo = styled(Logo)`
  width: 140px;
  height: 45px;
  text-align: center;
  position: absolute;
  left: 19vw;
  top: 2vw;
  cursor: pointer;
`;

const NavMenu = styled.div`
  z-index: 300;
  position: absolute;
  top: 0;
  right: 19vw;
  width: 160px;
  height: auto;
`;

const NavMenuTop = styled.div`
  width: 100%;
  height: 100px;
  background-color: #071b34;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledMenuXBtn = styled(MenuXBtn)`
  cursor: pointer;
`;

const StyledMenuBtn = styled(MenuBtn)`
  cursor: pointer;
`;

const NavMenuMiddle = styled.div`
  width: 100%;
  height: ${(props) =>
    props.$menuOpen ? (props.$isLogin ? "320px" : "230px") : "0px"};
  background-color: #071b34;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
`;

const MyInfo = styled.ul`
  width: 100%;
  height: auto;
  padding: 0px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const MyInfoItem = styled.li`
  width: 100%;
  height: auto;
  display: flex;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 5px;
  /* position: relative; */
  box-sizing: border-box;
  border-top: 1px solid #304055;
  /* &:after {
    width: 100%;
    height: 1px;
    content: "";
    left: 0; 
    right: 0;
    top: 0;
    margin: auto;
    display: block;  
    position: absolute;      
    background-color: red;
  } */
`;

const MyInfoItemFirst = styled(MyInfoItem)`
  font-family: var(--font-hunmin);
  > p {
    color: #fff;
    line-height: 26px;
    font-size: 22px;
    /* padding-left: 0; */
    > span {
      color: #e75852;
    }
  }
  > a {
    display: flex;
    align-items: center;
    line-height: 26px;
    color: #fff;
    font-weight: 400;
    font-size: 18px;
    svg {
      margin: 0 0 0 3px;
      transition: transform, 0.2s ease-in-out;
      path {
        stroke: #fff;
      }
    }
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const LinkMypage = styled(Link)`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: ${(props) => (props.$isLogin ? "#fff" : "#455263")};
  pointer-events: ${(props) => (props.$isLogin ? "initial" : "none")};
`;

const LogoutBtn = styled.button`
  color: #bdbdbd;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px; /* 150% */
`;

const NavMenuBottom = styled.div`
  width: 100%;
  height: 48px;
`;
