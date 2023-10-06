import HomePage from "./components/HomePage";
import Error404 from "./components/Error404";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AppContext from "./AppContext";
import Auth from "./components/Auth";
import UrlApp from "./components/UrlApp";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shortUrl, setShortUrl] = useState('');

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, shortUrl, setShortUrl }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<UrlApp />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
