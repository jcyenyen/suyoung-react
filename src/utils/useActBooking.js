import { useState, useContext, createContext } from "react";

// 專門拿來存商品的
const BookingActCartContext = createContext(null);

export const BookingActCartProvider = ({ children }) => {
    // background 預設背景圖狀態
    const [bookingActCart, setBookingActCart] = useState([]);

    return (
        // 傳送整個活動資訊
        <BookingActCartContext.Provider value={{ bookingActCart, setBookingActCart }}>
            {children}
        </BookingActCartContext.Provider>
    );
};

export const useBookingCart = () => useContext(BookingActCartContext);
