import React from "react";
import AppRoutes from "./app/AppRoutes";
import GlobalStyle from "./GlobalStyles.jsx";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./components/Homepage/Themes.jsx";


const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider
      theme={defaultTheme}
      >
        <AppRoutes />
      </ThemeProvider>
    </>
  );
};

export default App;
