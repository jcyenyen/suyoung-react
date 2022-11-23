import { useState, useContext, createContext } from "react";
import Axios from "axios";
import { BK_GET_LIST } from "../pages/Booking/config/ajax-path";
import { useAuth } from "../pages/Login/sub-pages/AuthProvider";

// 專門拿來存商品的
const BookingCartContext = createContext(null);

export const BookingCartProvider = ({ children }) => {
    // background 預設背景圖狀態
    const [bookingCart, setBookingCart] = useState([]);
    window.a = setBookingCart;
    const { ...auth } = useAuth();

    const getMemberCart = () => {
        if (auth.m_id) {
            Axios.get(
                `${BK_GET_LIST}/selectMemberCart?memberId=${auth.m_id}`
            ).then((response) => {
                setBookingCart(response.data);
            });
        }
    };

    return (
        // 傳送整個房型資訊
        <BookingCartContext.Provider
            value={{ bookingCart, setBookingCart, getMemberCart }}
        >
            {children}
        </BookingCartContext.Provider>
    );
};

export const useBookingCart = () => useContext(BookingCartContext);
