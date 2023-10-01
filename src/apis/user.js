import { client } from "./index";

// 로그인 시 post 요청
export const loginApi = async (payload) => {
  const response = await client.post("/api/v1/users/login", payload);
  return response;
};

export const checkEmailApi = async (payload) => {
  const response = await client.get("/api/v1/users/duplicate-check", {
    params: {
      email: payload,
    },
  });
  return response;
};

// 회원가입 시 post 요청
export const joinApi = async (payload) => {
  const response = await client.post("/api/v1/users/signup", payload);
  return response;
};

// 호패 만들면 post 요청
export const makeHopaeApi = async (payload) => {
  const response = await client.post("/api/v1/users/hopae", payload);
  return response;
};
