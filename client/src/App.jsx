import Navbar from "@/components/Navbar";
import ScreensRoot from "@/screens/Root";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Navbar />

      <Box as="main">
        <ScreensRoot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
