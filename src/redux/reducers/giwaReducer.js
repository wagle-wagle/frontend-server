import {
  INIT_GIWA,
  SELECT_GIWA,
  SELECT_TEXT_OPTION,
  WRITE_GUEST_TEXT,
  WRITE_NICKNAME,
} from "../actions/giwaActions";

const initialState = {
  number: null, //shapeCode
  text: "", //message
  fontColor: 6, //fontColorCode
  font: 1, //fontSize
  sort: 1, //sortCode
  nickname: "", //nickName
};

// user의 로그인 유지와 로그아웃을 위한 Reducer
export const giwaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_GIWA:
      return {
        ...state,
        number: action.payload,
      };
    case WRITE_GUEST_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    case WRITE_NICKNAME:
      return {
        ...state,
        nickname: action.payload,
      };
    case SELECT_TEXT_OPTION:
      return {
        ...state,
        ...action.payload,
      };
    case INIT_GIWA:
      return initialState;

    default:
      return state;
  }
};
