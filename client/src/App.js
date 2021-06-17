import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import MainRoutes from "./MainRoutes";
import Navbar from "./components/Navbar";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <div>
        <MainRoutes />
      </div>
    </ThemeProvider>
  );
};

export default App;
