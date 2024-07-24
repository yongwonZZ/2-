import React from 'react';
import './FooterNavbar.css';

const FooterNavbar: React.FC = () => {
    return (
        <footer className="footer-navbar">
            <nav>
                <ul className="navbar-list">
                    <li><a href="../App.tsx">공항</a></li>
                    <li><a href="#">환율</a></li>
                    <li><a href="../boardingPass">내티켓</a></li>
                    <li><a href="#">공항패션</a></li>
                    <li><a href="../login">마이페이지</a></li>
                </ul>
            </nav>
        </footer>
    );
}

export default FooterNavbar;
