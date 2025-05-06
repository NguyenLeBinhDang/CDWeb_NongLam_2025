import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './Page/Home/Home';
import AllManga from './Page/AllManga/AllManga';
import MangaDetail from './Page/MangaDetail/MangaDetail';
import { FilterProvider } from './context/FilterContext';
import { UserProvider } from './context/UserContext';
import Header from './compoment/Header/Header';
import Footer from './compoment/Footer/Footer';
import './App.css';
import Login from './Page/Login/Login';
import Register from './Page/Register/Register';
import MangaReader from './Page/MangaReader/MangaReader';

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Thay thế bằng Client ID của bạn

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <UserProvider>
        <FilterProvider>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/all-manga" element={<AllManga />} />
                <Route path="/manga/:id" element={<MangaDetail />} />
                <Route path="/manga/:id/chapter/:chapterId" element={<MangaReader />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </FilterProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
