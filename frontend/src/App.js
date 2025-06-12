import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import Home from './Page/Home/Home';
import AllManga from './Page/AllManga/AllManga';
import MangaDetail from './Page/MangaDetail/MangaDetail';
import {FilterProvider} from './context/FilterContext';
import {UserProvider} from './context/UserContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import Login from './Page/Login/Login';
import Register from './Page/Register/Register';
import MangaReader from './Page/MangaReader/MangaReader';
import UserInfo from './Page/UserInfo/UserInfo';
import {MangaReaderProvider} from "./context/MangaReaderContext";
import BookMark from "./Page/BookMark/BookMark";
import {BookmarkProvider} from "./context/BookMarkContext";
import {FloatingNavBarProvider} from "./context/FloatingNavBarContext";
import Category from "./Page/Category/Category";
import Admin from "./Admin";
import MangaManagement from './Admin/Pages/MangaManagement/MangaManagement';
import UserManagement from "./Admin/Pages/UserManagement/UserManagement";


const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Thay thế bằng Client ID của bạn

function App() {
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <UserProvider>
                <FilterProvider>
                    <MangaReaderProvider>
                        <FloatingNavBarProvider>
                            <BookmarkProvider>
                                <div className="App">
                                    <Header/>
                                    <main className="main-content">
                                        <Routes>
                                            <Route path="/" element={<Home/>}/>
                                            <Route path="/all-manga" element={<AllManga/>}/>
                                            <Route path="/manga/:id" element={<MangaDetail/>}/>
                                            <Route path="/manga/category/:categoryId" element={<Category/>}/>
                                            <Route path="/manga/:id/chapter/:chapterId" element={<MangaReader/>}/>
                                            <Route path="/login" element={<Login/>}/>
                                            <Route path="/register" element={<Register/>}/>
                                            <Route path="/profile" element={<UserInfo/>}/>
                                            <Route path="/bookmark" element={<BookMark/>}/>
                                            <Route path="/admin" element={<Admin/>}>
                                                <Route path="manga-management" element={<MangaManagement/>}/>
                                                <Route path="user-management" element={<UserManagement/>}/>
                                                <Route path="button3" element={<div>Button 3 Content</div>}/>
                                            </Route>
                                        </Routes>
                                    </main>
                                    <Footer/>
                                </div>
                            </BookmarkProvider>
                        </FloatingNavBarProvider>
                    </MangaReaderProvider>
                </FilterProvider>
            </UserProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
