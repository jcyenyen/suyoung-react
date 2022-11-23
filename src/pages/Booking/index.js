import React, { useEffect, useState } from "react";
import BookingArea from "./components/BookingArea";
import BookingCard from "./components/BookingCard";
import BookingFilter from "./components/BookingFilter";
import "./styles/index.scss";
import { useBackground } from "../../utils/useBackground";
import { useSpinner } from "../../useSpinner";
import { BK_GET_LIST } from "./config/ajax-path";
import { useBookingList } from "../../utils/useBookingList";
import { useBookingCart } from "../../utils/useBookingCart";
import { useAuth } from "../Login/sub-pages/AuthProvider";
import Axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

function Index(props) {
    const { setBackground } = useBackground();
    const { spinner, setLoading } = useSpinner(2000);
    // useContext
    const { bookingList, setBookingList } = useBookingList();
    const { bookingCart, setBookingCart } = useBookingCart();
    const { setAuth, ...auth } = useAuth();

    // 所有room 列表
    const [roomList, setRoomList] = useState();

    // 所有Tag 列表
    const [tagList, setTagList] = useState([]);
    // 會員的 favList roomsid
    const [favList, setFavList] = useState([]);

    /* ------ 監控所有篩選按鍵的狀態 ------ */

    // 確認日期狀態
    const [datePicker, setDatePicer] = useState({
        startDate: "",
        endDate: "",
        perNight: "",
        nextDate: "",
    });
    // 確認人數狀態
    const [adultValue, setAdultValue] = useState(0);
    const [kidsValue, setKidsValue] = useState(0);
    // 房型確認狀態
    const [checkroomType, setCheckRoomType] = useState([]);

    // 檢查房間狀態
    const [roomSelector, setRoomSelector] = useState([]);

    // 檢查價格狀態
    const [value, setValue] = useState([1000, 5000]);

    // 檢查標籤狀態
    const [tagValue, setTagValue] = useState([]);

    // 檢查大家怎麼說狀態
    const [recommend, setRecommend] = useState(false);
    const [popular, setPopular] = useState(false);

    // 文字篩選
    const [searchName, setSearchName] = useState("");
    // 先儲存使用者輸入的內容
    const [searchContext, setSearchContext] = useState("");

    //  價格多少狀態
    const [checkPrice, setCheckPrice] = useState("");

    // 用get 取得所有的值
    const getData = () => {
        // 從 bookingList解構
        const {
            adults,
            nextDate,
            endDate,
            roomType,
            startPrice,
            endPrice,
            tagCheck,
            popular,
            recommend,
            roomSelector,
            searchPrice,
        } = bookingList;

        Axios.get(
            `${BK_GET_LIST}/selectRoom?adults=${adults}&nextDate=${nextDate}&endDate=${endDate}&roomType=${roomType}&startPrice=${startPrice}&endPrice=${endPrice}&tagCheck=${tagCheck}&popular=${popular}&recommend=${recommend}&roomSelector=${roomSelector}&searchPrice=${searchPrice}`
        ).then((response) => {
            setRoomList(response.data.roomList);
            setTagList(response.data.tagList);
            // console.log("roomList:",response.data.roomList);
        });

        if (auth.m_id) {
            // 取得所有favlist 的 roomSid
            Axios.get(`${BK_GET_LIST}/favlist?memberId=${auth.m_id}`).then(
                (response) => {
                    // setFavList(response.data);
                    setFavList(response.data.map((v) => +v.fav_list_kind));
                }
            );
            // 取得會員購物車內的資料 登入時就可以直接匯入購物車資料
            Axios.get(
                `${BK_GET_LIST}/selectMemberCart?memberId=${auth.m_id}`
            ).then((response) => {
                // setFavList(response.data);
                setBookingCart(response.data);
            });
        }
    };

    // 測試後端撈資料
    // const orderDetailList = async() =>{
    //     const memberId = auth.m_id;
    //     await Axios.get(
    //         `${BK_GET_LIST}/selectOrderDetail?memberId=${memberId}`
    //     ).then((response) => {
    //         console.log(response.data);
    //     });
    // }

    // 得到bookingList 的值就執行 getData
    useEffect(() => {
        // if(Object.keys(bookingList).length > 0)return;
        getData();
    }, [bookingList]);

    //設定背景
    useEffect(() => {
        setBackground("bg1.svg");
        // 取得會員資料就存進去bookingList
        if (auth.authorized || auth.success) {
            setBookingList({ ...bookingList, memberId: auth.m_id });
        }
    }, []);

    // 設定 spinner
    useEffect(() => {
        setLoading(true);
    }, [setLoading]);

    // if(roomList.length===0)return;
    return (
        <>
            {spinner}
            <section className="Booking">
                <div className="Booking_container">
                    <div className="booking_area_container">
                        <BookingArea
                            adultValue={adultValue}
                            setAdultValue={setAdultValue}
                            kidsValue={kidsValue}
                            setKidsValue={setKidsValue}
                            datePicker={datePicker}
                            setDatePicer={setDatePicer}
                        />
                    </div>

                    <div className="room_area_flex">
                        <BookingFilter
                            searchName={searchName}
                            setSearchName={setSearchName}
                            checkroomType={checkroomType}
                            setCheckRoomType={setCheckRoomType}
                            roomSelector={roomSelector}
                            setRoomSelector={setRoomSelector}
                            value={value}
                            setValue={setValue}
                            tagValue={tagValue}
                            setTagValue={setTagValue}
                            recommend={recommend}
                            setRecommend={setRecommend}
                            popular={popular}
                            setPopular={setPopular}
                            searchContext={searchContext}
                            setSearchContext={setSearchContext}
                            checkPrice={checkPrice}
                            setCheckPrice={setCheckPrice}
                        />

                        <BookingCard
                            roomList={roomList}
                            setRoomList={setRoomList}
                            tagList={tagList}
                            favList={favList}
                            setFavList={setFavList}
                            searchName={searchName}
                            checkPrice={checkPrice}
                            setCheckPrice={setCheckPrice}
                            setSearchName={setSearchName}
                            setCheckRoomType={setCheckRoomType}
                            setRoomSelector={setRoomSelector}
                            setValue={setValue}
                            tagValue={tagValue}
                            setTagValue={setTagValue}
                            setRecommend={setRecommend}
                            setPopular={setPopular}
                            setSearchContext={setSearchContext}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Index;
