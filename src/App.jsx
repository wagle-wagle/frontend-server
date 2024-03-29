import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Onboarding from "./pages/Onboarding/Onboarding";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join";
import Main from "./pages/Main/Main";
import MakeHopae from "./pages/MakeHopae/MakeHopae";
// import KakaoLogin from "./pages/KakaoLogin/KakaoLogin";
import FindPwd from "./pages/FindPwd/FindPwd";
import MakeGiwaHouse from "./pages/MakeGiwaHouse/MakeGiwaHouse";
import StorageGiwa from "./pages/StorageGiwa/StorageGiwa";
import Withdrawal from "./pages/Withdrawal/Withdrawal";
import Setting from "./pages/Setting/Setting";
import MyPage from "./pages/MyPage/MyPage";
import ChangePwd from "./pages/ChangePwd/ChangePwd";
import ConfirmPwd from "./pages/ChangePwd/ConfirmPwd";
import Error from "./pages/Error/Error";
// import AuthRoute from "./component/AuthRoute/AuthRoute";
import { useEffect } from "react";
import { getItem } from "./utils/storage";
import { useDispatch } from "react-redux";
import { login } from "./redux/actions/userActions";
import Logout from "./pages/Logout/Logout";
// import NaverLogin from "./pages/NaverLogin/NaverLogin";

// 개발테스트용 임시 권한 제한 풀어놓음
// 백엔드 서버 올라오면 다시 수정해야함

const routes = [
  {
    path: "/",
    element: <Onboarding />,
  },
  {
    path: "/login",
    element: <Login />,
    // element: <AuthRoute loginOption={false} component={<Login />} />,
  },
  {
    path: "/join",
    element: <Join />,
    // element: <AuthRoute loginOption={false} component={<Join />} />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/main",
    element: <Main />,
    // element: <AuthRoute loginOption={true} component={<Main />} />,
  },
  {
    path: "/main/:url",
    element: <Main />,
  },
  {
    path: "/makeHopae",
    element: <MakeHopae />,
    // element: <AuthRoute loginOption={true} component={<MakeHopae />} />,
  },
  {
    path: "/makeGiwaHouse",
    element: <MakeGiwaHouse />,
    // element: <AuthRoute loginOption={true} component={<MakeGiwaHouse />} />,
  },
  // {
  //   path: "/oauth/kakao/callback",
  //   element: <AuthRoute loginOption={false} component={<KakaoLogin />} />,
  // },
  // 이 부분은 카카오 로그인이라 따로 처리해야함
  // {
  //   path: "/oauth/naver/callback",
  //   element: <AuthRoute loginOption={false} component={<NaverLogin />} />,
  // },
  {
    path: "/findPwd",
    element: <FindPwd />,
    // element: <AuthRoute loginOption={false} component={<FindPwd />} />,
  },
  {
    /* 마이페이지 - 보관함 */
    path: "/storageGiwa",
    element: <StorageGiwa />,
    // element: <AuthRoute loginOption={true} component={<StorageGiwa />} />,
  },
  {
    /* 회원탈퇴 */
    path: "/withdrawal",
    element: <Withdrawal />,
    // element: <AuthRoute loginOption={true} component={<Withdrawal />} />,
  },
  {
    /* 마이페이지 */
    path: "/myPage",
    element: <MyPage />,
    // element: <AuthRoute loginOption={true} component={<MyPage />} />,
  },
  {
    /* 마이페이지 - 설정 */
    path: "/setting",
    element: <Setting />,
    // element: <AuthRoute loginOption={true} component={<Setting />} />,
  },
  {
    path: "/changePwd",
    element: <ChangePwd />,
  },
  {
    path: "/confirmPwd",
    element: <ConfirmPwd />,
    // element: <AuthRoute loginOption={true} component={<ConfirmPwd />} />,
  },
  /* 404 에러 */
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "*",
    element: <Error />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const autoLogin = getItem("autoLogin");
    if (!autoLogin) return;

    const userInfo = getItem("USERINFO");

    dispatch(login(userInfo));
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
