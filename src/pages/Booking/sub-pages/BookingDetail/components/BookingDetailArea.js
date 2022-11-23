import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBookingList } from "../../../../../utils/useBookingList";
import { useBookingCart } from "../../../../../utils/useBookingCart";
import { useAuth } from "../../../../Login/sub-pages/AuthProvider";
import { BK_GET_LIST } from "../../../config/ajax-path";
import Axios from "axios";
import Swal from "sweetalert2";

function BookingDetailArea(props) {
    const { roomList, localRoomList } = props;
    const { bookingList, setBookingList } = useBookingList();
    const { bookingCart, setBookingCart } = useBookingCart();
    const { setAuth, ...auth } = useAuth();

    const navigate = useNavigate();

    const [room, setRoom] = useState({});

    // 確定要加入購物車後 存入資料庫中
    const postRoomData = () => {
        const data = {
            ...localRoomList,
            memberId: auth.authorized || auth.success ? auth.m_id : null,
        };
        console.log(localRoomList);
        console.log(data);
        Axios.post(`${BK_GET_LIST}/temporaryCart`, data);
        // setBookingList({
        //     roomSid: "",
        //     adults: "",
        //     kids: "0",
        //     startDate: "",
        //     endDate: "",
        //     perNight: "",
        //     roomType: [],
        //     startPrice: "",
        //     endPrice: "",
        //     tagCheck: [],
        //     popular: "",
        //     recommend: "",
        //     roomSelector: [],
        //     searchPrice: "",
        //     roomTotalPrice: "",
        //     nextDate: "",
        //     orderType: "1",
        //     memberId: "",
        // });
        // localStorage.removeItem("room");
    };

    // 把資料清空
    const clearData = () => {
        setBookingList({
            roomSid: "",
            adults: "",
            kids: "0",
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
            memberId: "",
        });
        localStorage.removeItem("room");
    };

    // 先取得 localStorage 的 room
    useEffect(() => {
        setRoom(JSON.parse(localStorage.getItem("room")));
    }, []);

    const keepShopping = () => {
        // 判斷如果第一個物件為空的 就跳過不做
        if (Object.keys(localRoomList).length === 0) return;

        let newArray = [];

        // 如果 bookingCart裡面已經有值了
        if (bookingCart.length > 0) {
            // 就新增新的進去
            newArray = [...bookingCart, localRoomList];
        } else {
            // 如果沒有 就直接把localRoomList存進去就可以了
            newArray = [localRoomList];
        }
        //最後存到BookingCart
        setBookingCart(newArray);
    };
    const insertToCart = () => {
        // 物件的 keys 是一個陣列
        // 判斷如果第一個物件為空的 就跳過不做
        if (Object.keys(localRoomList).length === 0) return;

        let newArray = [];

        // 如果 bookingCart裡面已經有值了
        if (bookingCart.length > 0) {
            // 就新增新的進去
            newArray = [...bookingCart, localRoomList];
        } else {
            // 如果沒有 就直接把localRoomList存進去就可以了
            newArray = [localRoomList];
        }

        //最後一起存到roomItem 給 購物車
        //最後存到BookingCart
        setBookingCart(newArray);
        localStorage.setItem("roomItem", JSON.stringify(newArray));

        // console.log(newArray);
    };

    if (roomList.length === 0) return <></>;

    return (
        <>
            <div className="booking_detail_area">
                <div className="booking_date_title">
                    <p>入住日期</p>
                </div>
                <div className="booking_date_in input_group">
                    <input
                        type="text"
                        readOnly
                        placeholder={room.startDate || bookingList.startDate}
                    />
                    <label htmlFor="">Date</label>
                </div>
                <div className="booking_date_title">
                    <p>離開日期</p>
                </div>
                <div className="booking_date_out input_group">
                    <input
                        type="text"
                        readOnly
                        placeholder={room.endDate || bookingList.endDate}
                    />
                    <label htmlFor="">Date</label>
                </div>
                <div className="booking_date_title">
                    <p>入住人數</p>
                </div>
                <div className="booking_person input_group">
                    <input
                        type="text"
                        readOnly
                        placeholder={
                            room.adults + " 位大人 ｜ " + room.kids + " 位小孩"
                        }
                    />
                    <label htmlFor="">Num</label>
                </div>
            </div>
            <div className="room_Result">
                <div className="room_title">
                    <h4>{roomList[0].room_name}</h4>
                </div>
                <div className="room_result_type">
                    <div className="room_modify">
                        <div className="room_modify_name">
                            <p>房間數量</p>
                        </div>
                        <div className="modify_unit">
                            <p>
                                <span>1</span> 間
                            </p>
                        </div>
                    </div>
                    <div className="room_price">
                        <div className="room_price_name">
                            <p>
                                TWD. <span>{roomList[0].room_price}</span>
                            </p>
                        </div>
                        <div className="room_num">
                            <p>
                                <span>
                                    {room.perNight || bookingList.perNight}
                                </span>{" "}
                                晚
                            </p>
                        </div>
                    </div>
                    <div className="room_add_bed">
                        <div className="add_bed_name">
                            <p>加床(TWD.200)</p>
                        </div>
                        <div className="add_bed_num">
                            <p>
                                <span>
                                    {bookingList.kids || room.kids || 0}
                                </span>{" "}
                                床
                            </p>
                        </div>
                    </div>
                    <div className="room_result_total">
                        <p>total:</p>
                        <h5>
                            {bookingList.roomTotalPrice || room.roomTotalPrice}
                        </h5>
                    </div>
                    <div className="room_card_button_area">
                        <button
                            className="room_card_button"
                            onClick={() => {
                                clearData();
                                navigate("/shuyoung/Booking");
                            }}
                        >
                            返回
                        </button>

                        {auth.authorized || auth.success ? (
                            <button
                                className="room_card_button"
                                onClick={() => {
                                    localStorage.removeItem("room");
                                    Swal.fire({
                                        icon: "success",
                                        title: "已加入購物車",
                                        text: "您是否前往購物車結帳",
                                        color: "#224040",
                                        background: "#FFF",
                                        showConfirmButton: true,
                                        confirmButtonColor: "#224040",
                                        confirmButtonText: `是`,
                                        showDenyButton: true,
                                        denyButtonText: `繼續購物`,
                                        denyButtonColor: "#c1a688",
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            postRoomData();
                                            insertToCart();
                                            clearData();

                                            navigate("/shuyoung/Cart");
                                        } else if (result.isDenied) {
                                            postRoomData();
                                            keepShopping();
                                            insertToCart();
                                            clearData();
                                            navigate("/shuyoung/Booking");
                                        }
                                    });
                                }}
                            >
                                加入購物車
                            </button>
                        ) : (
                            <button
                                className="room_card_button"
                                onClick={() => {
                                    localStorage.removeItem("room");
                                    Swal.fire({
                                        icon: "warning",
                                        title: "尚未登入會員",
                                        text: "請先登入會員",
                                        color: "#952e1f",
                                        background: "#FFF",
                                        showConfirmButton: true,
                                        confirmButtonColor: "#952e1f",
                                        confirmButtonText: `前往會員頁`,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            postRoomData();
                                            insertToCart();
                                            clearData();
                                            navigate("/shuyoung/Join");
                                        }
                                    });
                                }}
                            >
                                加入購物車
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingDetailArea;
