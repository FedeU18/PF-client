import { DARK_THEME, LIGHT_THEME } from "../types/typesThemes";

const initialState = {
  theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DARK_THEME:
      localStorage.setItem("theme", "dark");
      return {
        theme: "dark",
      };
    case LIGHT_THEME:
      localStorage.setItem("theme", "light");
      return {
        theme: "light",
      };
    default:
      return { ...state };
  }
};

export const verifyTheme = () => {
  const getTheme = localStorage.getItem("theme")

  if(getTheme === "dark"){
    return true
  }else {
    return false
  }
}


export default themeReducer;
