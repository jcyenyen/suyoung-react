import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./footer";
import { useBackground } from "../utils/useBackground";

function Layout({ children }) {
    const { background, setBackground } = useBackground();

    return (
        <div           
        style={{
            minHeight: "100vh",
            backgroundImage: `url("http://localhost:3777/background/${background}")`,
            backgroundPosition: "50% 40%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "relative",
            fontFamily: "Noto Sans TC , sans-serif",
            listStyle: "none",
            
        }}
    >
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
