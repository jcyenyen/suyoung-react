import { useState, useContext, createContext } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    // background 預設背景圖狀態
    const [background, setBackground] = useState("bg1.svg");

    return (
        // 更動整個頁面的背景狀態
        <ThemeContext.Provider value={{ background, setBackground }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useBackground = () => useContext(ThemeContext);
