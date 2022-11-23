import { useState, useContext, createContext } from "react";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
    // background 預設背景圖狀態
    const [bookingList, setBookingList] = useState({
        roomSid: "",
        adults: "",
        kids: 0,
        startDate: "",
        endDate: "",
        perNight: "",
        roomType: [],
        startPrice: "",
        endPrice: "",
        tagCheck: [],
        popular: "",
        recommend: "",
        roomSelector: [],
        searchPrice: "",
        roomTotalPrice: "",
        nextDate: "",
        orderType: "1",
    });

    const clearBookingList = () => {
        setBookingList({
            ...bookingList,
            roomSid: "",
            adults: "",
            kids: 0,
            startDate: "",
            endDate: "",
            perNight: "",
            roomType: [],
            startPrice: "",
            endPrice: "",
            tagCheck: [],
            popular: "",
            recommend: "",
            roomSelector: [],
            searchPrice: "",
            roomTotalPrice: "",
            nextDate: "",
            orderType: "1",
        });
    };

    return (
        // 傳送整個房型資訊
        <BookingContext.Provider
            value={{ bookingList, setBookingList, clearBookingList }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBookingList = () => useContext(BookingContext);
