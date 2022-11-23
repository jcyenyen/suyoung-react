import { Fragment, useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { BK_GET_LIST } from "../config/ajax-path";
import { useBookingList } from "../../../utils/useBookingList";
import { useAuth } from "../../Login/sub-pages/AuthProvider";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function BookingCard(props) {
    const {
        roomList,
        tagValue,
        tagList,
        favList,
        setFavList,
        searchName,
        checkPrice,
    } = props;
    // 篩選控制器重置
    const {
        setSearchName,
        setCheckRoomType,
        setRoomSelector,
        setValue,
        setTagValue,
        setRecommend,
        setPopular,
        setSearchContext,
    } = props;
    // useContext
    const { bookingList, setBookingList } = useBookingList();
    const { setAuth, ...auth } = useAuth();

    // 準備傳到後端的資料
    const [memberKeep, setMemberKeep] = useState({
        roomSid: "",
        memberId: "",
        favType: 1,
    });

    const [newRoomList, setNewRoomList] = useState();
    // 控制 收藏功能
    const keepHandler = (e) => {
        const checked = e.target.checked;
        const roomSid = e.target.value;
        const memberId = auth.m_id;

        if (checked) {
            // 先存一個新的
            const newMemberKeep = {
                ...memberKeep,
                roomSid: roomSid,
                memberId: memberId,
            };
            // 存進資料庫
            postKeep(newMemberKeep);
            // 存進狀態
            setMemberKeep(newMemberKeep);
            setFavList([...favList, +roomSid]);
            memberAlertConfirm();
        } else {
            // 刪除資料
            deleteKeep(roomSid);
            memberAlertDeny();
        }
    };
    const memberAlertConfirm = () => {
        Swal.fire({
            imageUrl: "/member_img/logo.svg",
            title: "收藏成功",
            text: "下次訂房可於會員中心快速查詢哦!",
            color: "#224040",
            background: "#FFF",
            confirmButtonColor: "#224040",
        });
    };
    const memberAlertDeny = () => {
        Swal.fire({
            imageUrl: "/member_img/logo.svg",
            title: "取消收藏",
            text: "不喜歡嗎?!確定不再看看其他間嗎?!",
            color: "#224040",
            background: "#FFF",
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonColor: "#952E1F",
            denyButtonText: "我再看看其他間",
        }).then((result) => {
            if (result.isDenied)
                Swal.fire({
                    imageUrl: "/member_img/logo.svg",
                    title: "好吧！放你一馬",
                    text: "再給我去挑其他間!",
                    color: "#224040",
                    background: "#FFF",
                    showConfirmButton: false,
                    timer: 1500,
                });
        });
    };

    const alertSearchError = () => {
        Swal.fire({
            icon: "error",
            title: "輸入資料有誤",
            text: "請重新調整篩選內容!",
            color: "#952E1F",
            background: "#FFF",
            confirmButtonColor: "#952E1F",
        }).then((result) => {
            if (result.isConfirmed) {
                setSearchName("");
                setSearchContext("");
            }
        });
    };

    // 如果 keep 是 unchecked 刪除該筆資料
    const deleteKeep = async (sid) => {
        const room_sid = sid;
        const oldFavList = favList;
        const newFavList = oldFavList.filter((v) => v !== +sid);
        setFavList(newFavList);
        const res = await Axios.delete(
            `${BK_GET_LIST}/deleteKeep?memberId=${auth.m_id}&roomSid=${room_sid}`
        );
        // console.log(res);
    };

    // 把會員收藏存進去資料庫
    const postKeep = async (newMemberKeep) => {
        await Axios.post(`${BK_GET_LIST}/addKeep`, newMemberKeep);
    };

    // 用物件的key值去排序資料 價格低到高
    function sortByKeyDown(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return x < y ? -1 : x > y ? 1 : 0;
        });
    }

    // 用物件的key值去排序資料 價格高到低
    function sortByKeyUp(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return x < y ? 1 : x > y ? -1 : 0;
        });
    }

    useEffect(() => {
        if (!roomList) return;
        const oldRoomList = roomList;
        // 把整個資料接成一個陣列
        // const newRoomList = oldRoomList.filter((v)=>Object.values(v).join("").includes(searchName));
        const newRoomList = oldRoomList.filter((v) =>
            v.room_name.includes(searchName)
        );
        setNewRoomList(newRoomList);
        // console.log("newRoomList:",newRoomList);

        // 如果篩選後沒有值 跳提醒
    }, [roomList, searchName]);

    useEffect(() => {
        if (!newRoomList) return;
        if (newRoomList.length === 0) {
            alertSearchError();
        }
    }, [newRoomList]);

    useEffect(() => {
        // 沒有值就return 掉
        if (checkPrice === "") return;
        // 複製roomList
        const DownRoomList = [...roomList];
        const UpRoomList = [...roomList];
        // 拿去排序
        sortByKeyDown(DownRoomList, "room_price");
        sortByKeyUp(UpRoomList, "room_price");
        // 看按鈕的值 改變newRoomList 的值
        if (checkPrice === "1") setNewRoomList(DownRoomList);
        if (checkPrice === "2") setNewRoomList(UpRoomList);
        // console.log("DownRoomList:",DownRoomList);
        // console.log("UpRoomList:",UpRoomList);
    }, [roomList, checkPrice]);

    return (
        <>
            <div className="room_card_flex">
                {newRoomList && newRoomList.length ? (
                    newRoomList.map((v, i) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -100 }}
                                transition={{
                                    duration: 0.5,
                                    default: { ease: "linear" },
                                }}
                                className="room_card_area"
                                key={v.sid}
                            >
                                <div className="room_card_img_area">
                                    <div className="room_card_img">
                                        <img
                                            src={
                                                "/room_imgs/" +
                                                v.room_folder +
                                                "/" +
                                                v.room_image
                                            }
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="room_card_content">
                                    <div className="room_card_title">
                                        <h4>{v.room_name}</h4>
                                    </div>
                                    <div className="room_card_subtitle">
                                        <h5>
                                            {v.person_num}人房{" "}
                                            {v.person_num / 2}
                                            張雙人床
                                        </h5>
                                    </div>
                                    <div className="room_card_tag">
                                        {tagList.map((t, ti) => {
                                            return v.sid === t.sid ? (
                                                <Fragment key={ti}>
                                                    <input
                                                        className="room_card_tag_btn"
                                                        type="checkbox"
                                                        name="tagBtn"
                                                        id={
                                                            "tagBtn-" + (ti + 1)
                                                        }
                                                        value={t.t_id}
                                                        readOnly
                                                        checked={tagValue.includes(
                                                            t.t_id + ""
                                                        )}
                                                    />
                                                    <label
                                                        className="for-room_card_tag_btn"
                                                        htmlFor={
                                                            "tagBtn-" + (ti + 1)
                                                        }
                                                    >
                                                        <span className="text">
                                                            {t.type}
                                                        </span>
                                                    </label>
                                                </Fragment>
                                            ) : null;
                                        })}
                                    </div>
                                    <div className="room_card_Price">
                                        <p>TWD:</p>
                                        <h4>{v.room_price}</h4>
                                        <p>晚</p>
                                    </div>
                                    <div className="room_card_button_area">
                                        <div className="room_card_btn_area">
                                            <Link
                                                to={
                                                    bookingList &&
                                                    bookingList.startDate &&
                                                    bookingList.endDate &&
                                                    bookingList.adults
                                                        ? "/shuyoung/Booking/BookingDetail"
                                                        : "/shuyoung/Booking"
                                                }
                                            >
                                                <button
                                                    className="room_card_button"
                                                    onClick={() => {
                                                        if (
                                                            bookingList &&
                                                            bookingList.startDate &&
                                                            bookingList.endDate &&
                                                            bookingList.adults
                                                        ) {
                                                            const newBookingList =
                                                                {
                                                                    ...bookingList,
                                                                    roomSid:
                                                                        v.sid,
                                                                    adults: bookingList.adults,
                                                                    kids: bookingList.kids,
                                                                };
                                                            setBookingList(
                                                                newBookingList
                                                            );

                                                            localStorage.setItem(
                                                                "room",
                                                                JSON.stringify(
                                                                    newBookingList
                                                                )
                                                            );
                                                        } else {
                                                            Swal.fire({
                                                                icon: "error",
                                                                title: "輸入資料有誤",
                                                                text: "請輸入訂房日期及人數!",
                                                                color: "#224040",
                                                                background:
                                                                    "#FFF",
                                                                confirmButtonColor:
                                                                    "#224040",
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <span>點我訂房</span>
                                                </button>
                                            </Link>
                                        </div>

                                        <div className="keep_button">
                                            {auth.authorized || auth.success ? (
                                                <input
                                                    className="checkbox-tools"
                                                    type="checkbox"
                                                    name="keep"
                                                    id={"keepBtn" + i}
                                                    value={v.sid}
                                                    onChange={keepHandler}
                                                    checked={favList.includes(
                                                        v.sid
                                                    )}
                                                />
                                            ) : (
                                                <input
                                                    className="checkbox-tools"
                                                    type="checkbox"
                                                    name="keep"
                                                    id={"keepBtn" + i}
                                                    value={v.sid}
                                                    checked={favList.includes(
                                                        v.sid
                                                    )}
                                                    onChange={() => {
                                                        Swal.fire({
                                                            icon: "error",
                                                            title: "未登入會員",
                                                            text: "請先登入會員",
                                                            color: "#224040",
                                                            background: "#fff",
                                                            confirmButtonColor:
                                                                "#224040",
                                                        });
                                                    }}
                                                />
                                            )}

                                            <label
                                                className="for-checkbox-tools"
                                                htmlFor={"keepBtn" + i}
                                            >
                                                {favList.includes(v.sid) ? (
                                                    <AiFillHeart className="fillHeart" />
                                                ) : (
                                                    <AiOutlineHeart className="outlineHeart" />
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{
                            duration: 0.5,
                            default: { ease: "linear" },
                        }}
                        className="emptyRoomSearch"
                    >
                        <h5>你所搜尋的條件下沒有空房，請調整搜尋內容。</h5>
                        {/* {alertSearchError()} */}
                    </motion.div>
                )}
            </div>
            {/* <div
                    className="room_card_tag_btn"
                    key={ti}
                >
                    <span className="text">
                        {t.type}
                    </span>
                </div> */}
        </>
    );
}

export default BookingCard;
