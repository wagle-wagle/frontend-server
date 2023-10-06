import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Onboarding from "./pages/Onboarding/Onboarding";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join";
import Main from "./pages/Main/Main";
import MakeHopae from "./pages/MakeHopae/MakeHopae";
import KakaoLogin from "./pages/KakaoLogin/KakaoLogin";
import FindPwd from "./pages/FindPwd/FindPwd";
import MakeGiwaHouse from "./pages/MakeGiwaHouse/MakeGiwaHouse";
import StorageGiwa from "./pages/StorageGiwa/StorageGiwa";
import Withdrawal from "./pages/Withdrawal/Withdrawal";
import Setting from "./pages/Setting/Setting";
import MyPage from "./pages/MyPage/MyPage";
import ChangePwd from "./pages/ChangePwd/ChangePwd";
import ConfirmPwd from "./pages/ChangePwd/ConfirmPwd";
import Error from "./pages/Error/Error";
import AuthRoute from "./component/AuthRoute/AuthRoute";

const routes = [
  {
    path: "/",
    element: <Onboarding />,
  },
  {
    path: "/login",
    element: <AuthRoute loginOption={false} component={<Login />} />,
  },
  {
    path: "/join",
    element: <AuthRoute loginOption={false} component={<Join />} />,
  },
  {
    path: "/main",
    element: <AuthRoute loginOption={true} component={<Main />} />,
  },
  {
    path: "/main/:url",
    element: <Main />,
  },
  {
    path: "/makeHopae",
    element: <AuthRoute loginOption={true} component={<MakeHopae />} />,
  },
  {
    path: "/makeGiwaHouse",
    element: <AuthRoute loginOption={true} component={<MakeGiwaHouse />} />,
  },
  {
    path: "/kakao_login",
    element: <AuthRoute loginOption={false} component={<KakaoLogin />} />,
  },
  {
    path: "/findPwd",
    element: <AuthRoute loginOption={false} component={<FindPwd />} />,
  },
  {
    /* 마이페이지 - 보관함 */
    path: "/storageGiwa",
    element: <AuthRoute loginOption={true} component={<StorageGiwa />} />,
  },
  {
    /* 회원탈퇴 */
    path: "/withdrawal",
    element: <AuthRoute loginOption={true} component={<Withdrawal />} />,
  },
  {
    /* 마이페이지 */
    path: "/myPage",
    element: <AuthRoute loginOption={true} component={<MyPage />} />,
  },
  {
    /* 마이페이지 - 설정 */
    path: "/setting",
    element: <AuthRoute loginOption={true} component={<Setting />} />,
  },
  {
    path: "/changePwd",
    element: <AuthRoute loginOption={true} component={<ChangePwd />} />,
  },
  {
    path: "/confirmPwd",
    element: <AuthRoute loginOption={true} component={<ConfirmPwd />} />,
  },
  /* 404 에러 */
  {
    path: "/error",
    element: <Error />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
