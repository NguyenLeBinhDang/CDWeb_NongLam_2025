import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-widgets">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-widget about-widget">
                                <h4 className="widget-title">Về TopTruyenTV</h4>
                                <div className="about-content">
                                    <p>TopTruyenTV là website đọc truyện tranh online được nhiều bạn trẻ yêu thích và đánh giá cao, với nhiều thể loại truyện đa dạng.</p>
                                    <div className="social-links mt-3">
                                        <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                                        <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                                        <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                                        <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-widget links-widget">
                                <h4 className="widget-title">Liên kết hữu ích</h4>
                                <ul className="footer-links">
                                    <li><Link to="/terms">Điều khoản dịch vụ</Link></li>
                                    <li><Link to="/privacy">Chính sách bảo mật</Link></li>
                                    <li><Link to="/dmca">DMCA</Link></li>
                                    <li><Link to="/contact">Liên hệ</Link></li>
                                    <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-widget categories-widget">
                                <h4 className="widget-title">Thể loại phổ biến</h4>
                                <ul className="footer-links">
                                    <li><Link to="/category/action">Action</Link></li>
                                    <li><Link to="/category/adventure">Adventure</Link></li>
                                    <li><Link to="/category/comedy">Comedy</Link></li>
                                    <li><Link to="/category/romance">Romance</Link></li>
                                    <li><Link to="/category/fantasy">Fantasy</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyright-text">
                                <p>&copy; {new Date().getFullYear()} TopTruyenTV. Tất cả các quyền được bảo lưu.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
