import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import MainRouter from "../MainRouter";
import theme from "../theme";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </Router>
  );
};
export default App;
