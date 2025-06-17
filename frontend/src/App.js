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
import ForgotPassword from "./Page/ForgotPassword/ForgotPassword";
import {ForgotPasswordProvider} from "./context/ForgotPasswordContext";
import AdminRoute from "./Admin/AdminRoute";
import Comments from "./Page/Comments/Comments";
import {CommentProvider} from "./context/CommentsContext";


const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Thay thế bằng Client ID của bạn

function App() {
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <ForgotPasswordProvider>
                <UserProvider>
                    <FilterProvider>
                        <MangaReaderProvider>
                            <FloatingNavBarProvider>
                                <CommentProvider>
                                    <BookmarkProvider>
                                        <div className="App">
                                            <Header/>
                                            <main className="main-content">
                                                <Routes>
                                                    <Route path="/" element={<Home/>}/>
                                                    <Route path="/all-manga" element={<AllManga/>}/>
                                                    <Route path="/manga/:id" element={<MangaDetail/>}/>
                                                    <Route path="/manga/category/:categoryId" element={<Category/>}/>
                                                    <Route path="/manga/:mangaId/chapter/:chapNum"
                                                           element={<MangaReader/>}/>
                                                    <Route path="/manga/:mangaId/chapter/:chapId/comments"
                                                           element={<Comments/>}/>
                                                    <Route path="/login" element={<Login/>}/>
                                                    <Route path="/register" element={<Register/>}/>
                                                    <Route path="/profile" element={<UserInfo/>}/>
                                                    <Route path="/bookmark" element={<BookMark/>}/>
                                                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                                                    <Route path="/admin" element={<AdminRoute allowedRoles={["ADMIN", "MOD"]} />}>
                                                        <Route element={<Admin />}>
                                                            <Route index element={<div>Welcome to Admin Dashboard</div>} />
                                                            <Route path="manga-management" element={<MangaManagement />} />
                                                            <Route path="user-management" element={<UserManagement />} />
                                                            <Route path="button3" element={<div>Button 3 Content</div>} />
                                                        </Route>
                                                    </Route>
                                                </Routes>
                                            </main>
                                            <Footer/>
                                        </div>
                                    </BookmarkProvider>
                                </CommentProvider>
                            </FloatingNavBarProvider>
                        </MangaReaderProvider>
                    </FilterProvider>
                </UserProvider>
            </ForgotPasswordProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
