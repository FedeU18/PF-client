import { DARK_THEME, LIGHT_THEME } from "../types/typesThemes";

export const setDarkTheme = () => {
  return {
    type: DARK_THEME,
  };
};

export const setLightTheme = () => {
  return {
    type: LIGHT_THEME,
  };
};
