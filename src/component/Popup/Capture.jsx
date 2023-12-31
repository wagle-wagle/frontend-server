import Modal from "../Modal/Modal";
import styled from "styled-components";
import captureImg from "../../assets/popup/capture_img.png";
import { ReactComponent as CloseBtn } from "../../assets/common/closeBtn.svg";
import { ReactComponent as Board } from "../../assets/popup/board_img_2.svg";
import { ReactComponent as SaveImg } from "../../assets/popup/save_img.svg";
import { ReactComponent as InstarLogo } from "../../assets/popup/instar_logo.svg";
import { ReactComponent as InstarStory } from "../../assets/popup/instar_story.svg";
import { ReactComponent as KaKaoIcon } from "../../assets/popup/kakao.svg";
import { useEffect, useState } from "react";
import saveAs from "file-saver";

const Captrue = ({ setCapturePopBol, canvas, url }) => {
  const { Kakao } = window;
  const [img, setImg] = useState();

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init("4eeeca34fb6f2e14d966ae11afeaaa2c");
  }, []);

  useEffect(() => {
    if (!canvas) return;
    setImg(canvas.toDataURL("image/png"));
  }, [canvas]);

  const handleSaveCapture = () => {
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob !== null) {
        saveAs(blob, "WagleWagleGiwa.png");
      }
    });
  };

  const handleKaokaoShare = async () => {
    // if (!canvas) return;

    // // canvas.toBlob을 사용하여 이미지를 Blob 객체로 변환
    // canvas.toBlob((blob) => {
    //   if (blob) {
    //     // Blob 객체를 Kakao.Share.uploadImage에 전달
    //     Kakao.Share.uploadImage({
    //       file: blob,
    //     })
    //       .then(function (response) {
    //         console.log("imgurl", response.infos.original.url);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   }
    // }, "image/png"); // 이미지 형식을 지정 (예: "image/jpeg", "image/png" 등)

    // await Kakao.Share.uploadImage({
    //   file: canvas.toDataURL("image/png"),
    // })
    //   .then(function (response) {
    //     console.log("imgurl", response.infos.original.url);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    Kakao.Share.sendCustom({
      templateId: 99023,
      templateArgs: {
        PATH: `main/${url}`,
      },
    });
  };

  return (
    <Modal>
      <Contain>
        <XBtnBox onClick={() => setCapturePopBol(false)}>
          <CloseBtn width={36} height={37} fill="black" />
        </XBtnBox>
        <BoradWrap>
          <strong>아주 멋진 풍경이군~</strong>
          <div>
            <Board />
            <img src={img} alt="사진" />
          </div>
        </BoradWrap>
        <SavePoto>
          <button type="button" onClick={handleSaveCapture}>
            <SaveImg />
            <span>풍경 저장</span>
          </button>
        </SavePoto>
      </Contain>
    </Modal>
  );
};

export default Captrue;

const Contain = styled.div`
  position: relative;
  border-radius: 30px;
  background-color: #fff;
  padding: 60px 60px 50px;
  box-sizing: border-box;  
`;

const BoradWrap = styled.div`
  strong {
    display: block;
    color: #222;
    text-align: center;
    font-family: var(--font-hunmin);
    font-size: 32px;
    font-weight: 600;
    margin: 0 auto;
  }
  > div {
    position: relative;
    margin: 30px 0 50px;
    > img {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      width: 570px;
      height: 340px;
      margin: auto;
      object-fit: contain;
    }
  }
`;

const XBtnBox = styled.button`
  width: 36px;
  height: 36px;
  position: absolute;
  right: 30px;
  top: 30px;
  z-index: 1;
`;

const SavePoto = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 35px;
  button {  
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  span {
    margin: 10px 0 0;
    color: #222;
    text-align: center;
    font-family: var(--font-hunmin-saeron);
    font-size: 18px;
    font-weight: 600;
    line-height: normal;
  }
`;