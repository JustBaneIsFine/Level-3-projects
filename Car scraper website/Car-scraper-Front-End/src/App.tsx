import { useState, useRef } from 'react';
import './App.css';

// Components
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
// Containers
import Header from './containers/Header';
// Context providers
import { UserContextProvider } from './context/UserContext';
import { DisplayContextProvider } from './context/ItemDisplayContext';

function App() {
  return (
    <div className="App container">
      <UserContextProvider>
        <NavigationBar />

        <DisplayContextProvider>
          <Header />
        </DisplayContextProvider>
      </UserContextProvider>
      <Footer />
    </div>
  );
}

export default App;
