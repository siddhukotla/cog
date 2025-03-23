import React, { createContext } from 'react';

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{}}>
      {typeof children === 'function' ? children() : children}
    </ThemeContext.Provider>
  );
};
