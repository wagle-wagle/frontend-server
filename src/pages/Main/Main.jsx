import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import NavBar from "../../component/NavBar/NavBar";
import RightSide from "../../component/RightSide/RightSide";
import GiwaModal from "../../component/Modal/GiwaModal/GiwaModal";
import Completed from "../../component/Popup/Completed";
import BottomSide from "../../component/BottomSide/BottomSide";
import mainBg from "../../assets/bg_main.png";
import mainHouse from "../../assets/main_house.png";
import haetaeImg from "../../assets/main/haetae_img.png";
import taegeukgi from "../../assets/main/taegeukgi.png";
import pineTreeFront from "../../assets/main/pine_tree_1.png";
import pineTreeBack from "../../assets/main/pine_tree_2.png";
import CapturePopup from "../../component/BottomSide/IconPopup/CapturePopup";

const Main = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openNav, setOpenNav] = useState(true);
  const [openMakeup, setOpenMakeup] = useState(false);
  // 테스트용 - 수정예정
  const [background, setBackground] = useState("day");
  const changeBackground = (e) => {
    setBackground(e.target.value);
  };

  useEffect(() => {
    // jwt토큰을 넣어서 get요청하는 api호출
    // jwtTestApi().then((result) => {
    //   alert(result.data);
    // });
  }, []);

  const openMakeupHouse = () => {
    setOpenNav(false);
    setTimeout(() => {
      setOpenMakeup(true);
    }, 300);
  };

  const closeMakeupHouse = () => {
    setOpenMakeup(false);
    setTimeout(() => {
      setOpenNav(true);
    }, 300);
  };
  return (
    <>
      {openModal ? <GiwaModal onXBtnClick={() => setOpenModal(false)} /> : null}
      <NavBar isShowing={openNav} />
      {/* <ExDiv background={background === "day" ? mainBg : null}> */}
      <ExDiv background={background}>
        <StyledMain>
          <HouseBox className={openMakeup ? "left" : null}>
            <CatImgDiv>
              <img src={haetaeImg} alt="해태" />
            </CatImgDiv>
            <img src={taegeukgi} alt="태극기" />
          </HouseBox>
        </StyledMain>
        <RightSide
          openMakeup={openMakeup}
          xBtnClickHandler={closeMakeupHouse}
          setBackground={changeBackground}
        ></RightSide>
        <Test>
          {openMakeup ? null : <button onClick={openMakeupHouse}>사용자 : 기와집 만들기</button>}
          {openModal ? null : (
            <button
              onClick={() => {
                setOpenModal(true);
              }}
              style={{ marginBottom: "50px" }}
            >
              방문자 : 기와선택
            </button>
          )}
        </Test>
        <BottomSide
          openMakeup={openMakeup}
          openMakeupHouse={openMakeupHouse}
          bg={background}
        />
        <Tree>
          <img src={pineTreeFront} alt="앞 소나무" />
          <img src={pineTreeBack} alt="뒤 소나무" />
        </Tree>
      </ExDiv>
      {/* 캡쳐 팝업 start */}
      {/* <CapturePopup/> */}
      {/* 캡쳐 팝업 end */}

      {/* 기와 등록 완료 팝업창 start */}
      {/* <Completed/> */}
      {/* 기와 등록 완료 팝업창 end */}
    </>
  );
};

export default Main;

const ExDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(140deg, ${({ background }) => background === 'day' ? '#FFFEF9 0%, #FFF8DC 100%' : ' #8C92CA 0%, #31365B 100%'}); 
  position: relative;
  overflow: hidden;
`;

const StyledMain = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HouseBox = styled.div`
  width: 800px;
  height: 700px;
  background: url(${mainHouse}) no-repeat;
  background-size: 800px 700px;
  position: absolute;
  left: 90px; 
  top: 100px;
  right: 0;
  bottom: 0; 
  margin: auto;
  transition: all ease-in-out 1s;
  z-index: 2;
  > img {
    position: absolute; 
    left: -105px;
    top: 123px;
  }
  &.left {
    left: -400px;
  }
`;

const CatImgDiv = styled.div`
  width: 120px;
  height: 120px;
  position: absolute;
  top: 83px;
  left: 381px;
  img {
    width:100%;
    height: 100%;
  }
`;

const Tree = styled.div`
  width: 100%;
  height: 100%;
  position: absolute; 
  left: 0; 
  top: 0;
  > img {
    position: absolute;
    &:nth-of-type(1) { left: 0; bottom: 0; z-index: 2; }
    &:nth-of-type(2) { right: 0; top: 10%; }
  }
`;

const Test = styled.div`
  position: relative;
  z-index: 10;
  > button {
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 20px;
    font-weight: 600;
  }
`;