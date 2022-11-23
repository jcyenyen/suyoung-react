import React from "react";
import "../styles/footer.scss";

export default function Footer() {
    return (
        <footer>
            <div className="footer_left">
                <div className="footer_logo">
                    <li className="big_title">舒營</li>
                    <li className="big_title">SHUYOUNG</li>
                    <div className="footer_icon">
                        <i className="fa-brands fa-instagram-square"></i>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-line"></i>
                        <i className="fa-brands fa-twitter-square"></i>
                    </div>
                </div>
            </div>
            <div className="footer_right">
                <li>267002 宜蘭縣大同鄉新德路125號</li>
                <li>(03)980-1127</li>
                <li>Copyright © 2022 shuyoung. All rights reserved.</li>
            </div>
        </footer>
    );
}
