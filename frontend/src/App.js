import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './compoment/Header/Header';
import Footer from './compoment/Footer/Footer';
import Home from './Page/Home/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Thêm các Route khác ở đây khi cần thiết */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
