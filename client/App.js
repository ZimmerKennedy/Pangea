import React from "react";
import AppRoutes from "./app/AppRoutes";
import GlobalStyle from "./GlobalStyles.jsx";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./components/Homepage/Themes.jsx";


const App = () => {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider
      theme={defaultTheme}
      >
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
};

export default App;
