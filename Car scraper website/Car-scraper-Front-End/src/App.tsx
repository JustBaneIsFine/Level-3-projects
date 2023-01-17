import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import UserAccount from './pages/UserAccount';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Create from './pages/Create';

// Components
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

// Containers
import SearchDataContainer from './containers/SearcDataContainer';

// Context providers
import { UserContextProvider } from './context/UserContext';
import { DisplayContextProvider } from './context/ItemDisplayContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<SearchDataContainer />} />
            <Route
              path="/UserAccount"
              element={<UserAccount x="userAccount" />}
            />
            <Route path="/Register" element={<Register x="Register Page" />} />
            <Route path="/Login" element={<Login x="Login Page" />} />
            <Route path="/About" element={<About x="About Page" />} />
            {/* <Route path="/Create" element={<Create />} /> */}
          </Routes>
        </UserContextProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
