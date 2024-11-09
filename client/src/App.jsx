import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import MainRouter from '../MainRouter';
import theme from '../theme';
//import { hot } from 'react-hot-loader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../core/Home';
import AddConcerts from '../core/AddConcerts';
import EditProfile from '../user/EditProfile';


const App = () => {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <MainRouter />
                <ToastContainer />
                <Routes>
                <Route path="/" element={<Home />} />
                    <Route path="/add-concerts" element={<AddConcerts />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                </Routes>
            </ThemeProvider>
        </Router>
    );
};

export default App;