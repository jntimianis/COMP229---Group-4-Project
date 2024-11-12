import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import MainRouter from "../MainRouter";
import theme from "../theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainRouter />
        <ToastContainer />
      </ThemeProvider>
    </Router>
  );
};
export default App;
