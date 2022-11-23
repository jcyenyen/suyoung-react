import React, { Fragment, useState } from "react";
import { useBookingList } from "../../../../../utils/useBookingList";
import { Whisper, Popover } from "rsuite";
import { motion } from "framer-motion";
import { TiDelete } from "react-icons/ti";

function RoomFilterRoomSelect(props) {
    // 搜尋功能
    const {
        searchName,
        setSearchName,
        searchContext,
        setSearchContext,
        checkPrice,
        setCheckPrice,
    } = props;

    /* ------ useContext 的值 ------ */
    const { bookingList, setBookingList } = useBookingList();

    // 篩選器跳出開關
    const [open, setOpen] = useState(true);
    // const [checkPrice,setCheckPrice] = useState("");

    // 搜尋 控制器
    const SearchHandler = (e) => {
        const value = e.target.value;
        setSearchContext(value);
        //如果狀態清空了 searchName 也一起清空
        if (value === "") setSearchName("");
    };

    const SendSearchToBooking = () => {
        setSearchName(searchContext);
    };

    // 價格排序
    const SearchPrice = (e) => {
        const value = e.target.value;

        //先判斷是否有在likeList狀態陣列中
        if (checkPrice.includes(e.target.value)) {
            // if有 -> 清掉

            // 存回去setBookingList
            setBookingList({
                ...bookingList,
                searchPrice: "",
            });
            setCheckPrice("");
        } else {
            // else -> 直接取代

            //存回去roomType
            setBookingList({
                ...bookingList,
                searchPrice: value,
            });
            setCheckPrice(value);
        }
    };

    /* reset */
    const resetSearch = () => {
        // setBookingList({ ...bookingList, roomSelector: [] });
        setSearchName("");
        setSearchContext("");
        setBookingList({
            ...bookingList,
            searchPrice: "",
        });
        setCheckPrice("");
    };

    return (
        <>
            <div className="room_title roomSelect_title">
                <Whisper
                    followCursor
                    placement="top"
                    speaker={<Popover arrow={false}>Click</Popover>}
                >
                    <button
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        快速篩選
                    </button>
                </Whisper>
                {open ? (
                    <motion.button
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{
                            duration: 0.5,
                            default: { ease: "linear" },
                        }}
                        onClick={resetSearch}
                        className="delete_filter_roomType"
                    >
                        <TiDelete size={28} />
                    </motion.button>
                ) : null}
            </div>
            {open ? (
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{
                        duration: 0.5,
                        default: { ease: "linear" },
                    }}
                    className="roomSearch_area"
                >
                    <div className="roomSearch_input">
                        <input
                            className="SearchInput"
                            placeholder="輸入房間名稱搜尋"
                            type="text"
                            onChange={SearchHandler}
                            value={searchContext}
                        />
                        <button
                            className="SearchButton"
                            onClick={SendSearchToBooking}
                        >
                            送出
                        </button>
                    </div>
                    <div className="roomSearch_check">
                        <input
                            className="checkbox-priceUp"
                            type="checkbox"
                            name="priceUp"
                            id={"priceUp-1"}
                            value={1}
                            onChange={SearchPrice}
                            checked={checkPrice.includes(1 + "")}
                        />
                        <label
                            className="for-checkbox-priceUp"
                            htmlFor={"priceUp-1"}
                        >
                            <span className="text">價格由低到高</span>
                        </label>
                        <input
                            className="checkbox-priceUp"
                            type="checkbox"
                            name="priceUp"
                            id={"priceUp-2"}
                            value={2}
                            onChange={SearchPrice}
                            checked={checkPrice.includes(2 + "")}
                        />
                        <label
                            className="for-checkbox-priceUp"
                            htmlFor={"priceUp-2"}
                        >
                            <span className="text">價格由高到低</span>
                        </label>
                    </div>
                </motion.div>
            ) : null}
        </>
    );
}

export default RoomFilterRoomSelect;
