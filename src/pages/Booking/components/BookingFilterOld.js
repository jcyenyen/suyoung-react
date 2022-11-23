import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import { BK_GET_LIST } from "../config/ajax-path";
import { useBookingList } from "../../../utils/useBookingList";
import { Popover, Whisper, Button } from "rsuite";
import { RangeSlider, Row, Col, InputGroup, InputNumber, Drawer } from "rsuite";
function BookingFilter(props) {
    //所有標籤列表 從node 取出來的
    const [tagList, setTagList] = useState([]);

    // 所有房間列表
    const [roomList, setRoomList] = useState([]);
    // 檢查房間狀態
    const [roomSelector, setRoomSelector] = useState([]);

    // 房型確認狀態
    const [checkroomType, setCheckRoomType] = useState([]);

    const { bookingList, setBookingList } = useBookingList();

    // 價格slider的值
    const [value, setValue] = useState([1000, 5000]);

    // tag 狀態
    const [tagValue, setTagValue] = useState([]);

    // peoplesay
    const [recommend, setRecommend] = useState(false);
    const [popular, setPopular] = useState(false);

    /* ----- reset -----*/
    const resetPeople = () => {
        setPopular(1);
        setRecommend(1);
        setBookingList({ ...bookingList, popular: 0, recommend: 0 });
    };

    const resetTag = () => {
        setBookingList({ ...bookingList, tagCheck: [] });
        setTagValue([]);
    };

    const resetPrice = () => {
        setBookingList({ ...bookingList, startPrice: "", endPrice: "" });
        setValue([1000, 5000]);
    };

    const resetRoomSelecor = () => {
        setBookingList({ ...bookingList, roomSelector: [] });
        setRoomSelector([]);
    };

    const resetRoomType = () => {
        setBookingList({ ...bookingList, roomType: [] });
        setCheckRoomType([]);
    };

    // 最受歡迎
    const popularHandler = (e) => {
        if (!popular) {
            setPopular(true);
            setBookingList({ ...bookingList, popular: 1 });
        } else {
            setPopular(false);
            setBookingList({ ...bookingList, popular: 0 });
        }
    };
    // 最推薦
    const recommendHandler = (e) => {
        if (!recommend) {
            setRecommend(true);
            setBookingList({ ...bookingList, recommend: 1 });
        } else {
            setRecommend(false);
            setBookingList({ ...bookingList, recommend: 0 });
        }
    };
    // 房間 控制器
    const RoomSelectHandler = (e) => {
        const value = e.target.value;

        // const checked = e.target.checked;
        if (roomSelector.includes(value)) {
            // 拷貝
            const oldRoomSelector = bookingList.roomSelector;
            // 篩選掉不要的
            const newRoomSelector = oldRoomSelector.filter((v) => {
                return v !== value;
            });
            // 存回去TagCheck
            setBookingList({
                ...bookingList,
                roomSelector: newRoomSelector,
            });
            const oldRoom = roomSelector;
            const newRoom = oldRoom.filter((v) => {
                return v !== value;
            });
            setRoomSelector(newRoom);
        } else {
            // 拷貝並存進去新的value
            const newRoomSelector = [...bookingList.roomSelector, value];
            //存回去roomType
            setBookingList({
                ...bookingList,
                roomSelector: newRoomSelector,
            });
            setRoomSelector([...roomSelector, value]);
        }
    };
    // RoomType 房型控制器
    const RoomTypeHandler = (e) => {
        const value = e.target.value;
        // console.log(typeof value);
        //先判斷是否有在likeList狀態陣列中
        if (checkroomType.includes(e.target.value)) {
            // if有 -> 移出陣列
            // 拷貝
            const oldRoomType = bookingList.roomType;
            // 篩選掉不要的
            const newRoomType = oldRoomType.filter((v) => {
                return v !== value;
            });
            // 存回去setBookingList
            setBookingList({
                ...bookingList,
                roomType: newRoomType,
            });
            const oldCheckRoomType = checkroomType;
            const newChekRoomType = oldCheckRoomType.filter((v) => {
                return v !== value;
            });
            setCheckRoomType(newChekRoomType);
        } else {
            // else -> 加入陣列
            // 拷貝並存進去新的value
            const newRoomType = [...bookingList.roomType, value];
            //存回去roomType
            setBookingList({
                ...bookingList,
                roomType: newRoomType,
            });
            setCheckRoomType([...checkroomType, value]);
        }
    };

    // 掌控每一個tag 判斷 true 存進去 false 移除
    const tagHandler = (e) => {
        const value = e.target.value;
        // const checked = e.target.checked;
        if (tagValue.includes(value)) {
            // 拷貝
            const oldTagCheck = bookingList.tagCheck;
            // 篩選掉不要的
            const newTagCheck = oldTagCheck.filter((v) => {
                return v !== value;
            });
            // 存回去TagCheck
            setBookingList({
                ...bookingList,
                tagCheck: newTagCheck,
            });
            const oldTagValue = tagValue;
            const newTagValue = oldTagValue.filter((v) => {
                return v !== value;
            });
            setTagValue(newTagValue);
        } else {
            // 拷貝並存進去新的value
            const newTagCheck = [...bookingList.tagCheck, value];
            //存回去TagCheck
            setBookingList({
                ...bookingList,
                tagCheck: newTagCheck,
            });
            setTagValue([...tagValue, value]);
        }
    };
    // 用get 取得所有的值
    const getTagData = () => {
        Axios.get(`${BK_GET_LIST}/selectTag`).then((response) => {
            setTagList(response.data);
            // console.log(response.data);
        });
    };
    const getData = async () => {
        await Axios.get(`${BK_GET_LIST}/selectRoom`).then((response) => {
            // setRoomList(response.data.roomList);
            const roomList = response.data.roomList;
            // // 製作一個陣列 只取 room_name
            // const newRoomList = roomList.map((v) => v.room_name);
            setRoomList(roomList);
        });
    };

    /* --------mobile 篩選 -----------*/
    const [RTOpen, setRTOpen] = useState(false);
    const [ROpen, setROpen] = useState(false);
    const [POpen, setPOpen] = useState(false);
    const [tagOpen, setTagOpen] = useState(false);
    const [PeOpen, setPeOpen] = useState(false);

    const [placement, setPlacement] = useState();

    // mobile 篩選
    const handleOpen = (key) => {
        // 設定為從下往上跑出來的popup
        setPlacement(key);
    };
    // mobile 篩選 選擇不同的popup
    const openHandler = (v) => {
        if (v === 1) setRTOpen(true);
        if (v === 2) setROpen(true);
        if (v === 3) setPOpen(true);
        if (v === 4) setTagOpen(true);
        if (v === 5) setPeOpen(true);
    };

    useEffect(() => {
        getTagData();
        getData();
    }, []);
    useEffect(() => {
        if (bookingList.roomSelector.length !== 0) {
            setRoomSelector(bookingList.roomSelector);
        }
    }, [bookingList]);

    return (
        <>
            <div className="room_filter_container">
                <div className="room_filter_area">
                    <div className="room_filter_btn">
                        <div className="room_btn_flex">
                            <button
                                onClick={() => {
                                    handleOpen("bottom");
                                    openHandler(1);
                                }}
                            >
                                房型
                            </button>
                            <Drawer
                                placement={placement}
                                open={RTOpen}
                                onClose={() => setRTOpen(false)}
                                size={"xs"}
                            >
                                <Drawer.Header>
                                    <Drawer.Title>房型</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <div className="roomType_flex">
                                        <input
                                            className="checkbox-tools"
                                            type="checkbox"
                                            name="tools"
                                            id="tool-1"
                                            value={1}
                                            onClick={RoomTypeHandler}
                                            checked={checkroomType.includes(
                                                "1"
                                            )}
                                        />
                                        <label
                                            className="for-checkbox-tools"
                                            htmlFor="tool-1"
                                        >
                                            <i className="fa-solid fa-campground"></i>
                                            頂級網美
                                        </label>
                                        <input
                                            className="checkbox-tools"
                                            type="checkbox"
                                            name="tools"
                                            id="tool-2"
                                            value={2}
                                            onClick={RoomTypeHandler}
                                            checked={checkroomType.includes(
                                                "2"
                                            )}
                                        />
                                        <label
                                            className="for-checkbox-tools"
                                            htmlFor="tool-2"
                                        >
                                            <i className="fa-solid fa-tents"></i>
                                            溫馨親子
                                        </label>
                                        <input
                                            className="checkbox-tools"
                                            type="checkbox"
                                            name="tools"
                                            id="tool-3"
                                            value={3}
                                            onClick={RoomTypeHandler}
                                            checked={checkroomType.includes(
                                                "3"
                                            )}
                                        />
                                        <label
                                            className="for-checkbox-tools"
                                            htmlFor="tool-3"
                                        >
                                            <i className="fa-solid fa-caravan"></i>
                                            高級露營車
                                        </label>
                                        <input
                                            className="checkbox-tools"
                                            type="checkbox"
                                            name="tools"
                                            id="tool-4"
                                            value={4}
                                            onClick={RoomTypeHandler}
                                            checked={checkroomType.includes(
                                                "4"
                                            )}
                                        />
                                        <label
                                            className="for-checkbox-tools"
                                            htmlFor="tool-4"
                                        >
                                            <i className="fa-solid fa-person-hiking"></i>
                                            不求人露營
                                        </label>
                                    </div>
                                </Drawer.Body>
                            </Drawer>
                            <button
                                onClick={() => {
                                    handleOpen("bottom");
                                    openHandler(2);
                                }}
                            >
                                房間
                            </button>
                            <Drawer
                                placement={placement}
                                open={ROpen}
                                onClose={() => setROpen(false)}
                            >
                                <Drawer.Header>
                                    <Drawer.Title>房間</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <div className="roomSelect_area">
                                        {roomList &&
                                            roomList.map((v, i) => {
                                                return (
                                                    <Fragment key={i}>
                                                        <input
                                                            className="checkbox-roomSelect"
                                                            type="checkbox"
                                                            name="checkbox-roomSelect"
                                                            id={
                                                                "roomSelect-" +
                                                                i
                                                            }
                                                            checked={roomSelector.includes(
                                                                v.sid + ""
                                                            )}
                                                            value={v.sid}
                                                            onChange={
                                                                RoomSelectHandler
                                                            }
                                                        />
                                                        <label
                                                            className="for-checkbox-roomSelect"
                                                            htmlFor={
                                                                "roomSelect-" +
                                                                i
                                                            }
                                                        >
                                                            <span className="text">
                                                                {v.room_name}
                                                            </span>
                                                        </label>
                                                    </Fragment>
                                                );
                                            })}
                                    </div>
                                </Drawer.Body>
                            </Drawer>
                            <button
                                onClick={() => {
                                    handleOpen("bottom");
                                    openHandler(3);
                                }}
                            >
                                價格
                            </button>
                            <Drawer
                                placement={placement}
                                open={POpen}
                                onClose={() => setPOpen(false)}
                                size={"xs"}
                            >
                                <Drawer.Header>
                                    <Drawer.Title>價格</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <Row>
                                        <Col md={20}>
                                            <RangeSlider
                                                progress
                                                min={0}
                                                step={10}
                                                max={21000}
                                                value={value}
                                                onChange={(value) => {
                                                    setValue(value);
                                                    setBookingList({
                                                        ...bookingList,
                                                        startPrice: value[0],
                                                        endPrice: value[1],
                                                    });
                                                }}
                                            />
                                        </Col>
                                        <Col md={20} style={{ marginTop: 16 }}>
                                            <InputGroup>
                                                <InputNumber
                                                    min={0}
                                                    max={21000}
                                                    value={value[0]}
                                                    onChange={(nextValue) => {
                                                        const [start, end] =
                                                            value;
                                                        if (nextValue > end) {
                                                            return;
                                                        }
                                                        setValue([
                                                            nextValue,
                                                            end,
                                                        ]);
                                                        setBookingList({
                                                            ...bookingList,
                                                            startPrice:
                                                                nextValue,
                                                        });
                                                    }}
                                                />
                                                <InputGroup.Addon>
                                                    to
                                                </InputGroup.Addon>
                                                <InputNumber
                                                    min={800}
                                                    max={21000}
                                                    value={value[1]}
                                                    onChange={(nextValue) => {
                                                        const [start, end] =
                                                            value;
                                                        if (start > nextValue) {
                                                            return;
                                                        }
                                                        setValue([
                                                            start,
                                                            nextValue,
                                                        ]);
                                                        setBookingList({
                                                            ...bookingList,
                                                            endPrice: nextValue,
                                                        });
                                                    }}
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </Drawer.Body>
                            </Drawer>
                            <button
                                onClick={() => {
                                    handleOpen("bottom");
                                    openHandler(4);
                                }}
                            >
                                標籤
                            </button>
                            <Drawer
                                placement={placement}
                                open={tagOpen}
                                onClose={() => setTagOpen(false)}
                            >
                                <Drawer.Header>
                                    <Drawer.Title>標籤</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <div className="room_tag_area">
                                        {tagList.map((t, ti) => {
                                            return (
                                                <Fragment key={ti}>
                                                    <input
                                                        className="checkbox-booking"
                                                        type="checkbox"
                                                        name="booking"
                                                        id={
                                                            "booking-" +
                                                            (ti + 1)
                                                        }
                                                        value={t.t_id}
                                                        onChange={tagHandler}
                                                        checked={tagValue.includes(
                                                            t.t_id + ""
                                                        )}
                                                    />
                                                    <label
                                                        className="for-checkbox-booking"
                                                        htmlFor={
                                                            "booking-" +
                                                            (ti + 1)
                                                        }
                                                    >
                                                        <span className="text">
                                                            {t.type}
                                                        </span>
                                                    </label>
                                                </Fragment>
                                            );
                                        })}
                                    </div>
                                </Drawer.Body>
                            </Drawer>
                            <button
                                onClick={() => {
                                    handleOpen("bottom");
                                    openHandler(5);
                                }}
                            >
                                大推
                            </button>
                            <Drawer
                                placement={placement}
                                open={PeOpen}
                                onClose={() => setPeOpen(false)}
                                size={"xs"}
                            >
                                <Drawer.Header>
                                    <Drawer.Title>大推</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <div className="roomPeople_area">
                                        <input
                                            className="checkbox-people"
                                            type="checkbox"
                                            name="peopole"
                                            id="people-1"
                                            onChange={popularHandler}
                                            checked={popular}
                                        />
                                        <label
                                            className="for-checkbox-people"
                                            htmlFor="people-1"
                                        >
                                            <span className="text">
                                                popular
                                            </span>
                                        </label>
                                        <input
                                            className="checkbox-people"
                                            type="checkbox"
                                            name="people"
                                            id="people-2"
                                            onChange={recommendHandler}
                                            checked={recommend}
                                        />
                                        <label
                                            className="for-checkbox-people"
                                            htmlFor="people-2"
                                        >
                                            <span className="text">
                                                recommand
                                            </span>
                                        </label>
                                    </div>
                                </Drawer.Body>
                            </Drawer>
                        </div>
                    </div>
                    <div className="room_filter_roomType">
                        <div className="room_title roomType_title">
                            <Whisper
                                followCursor
                                speaker={
                                    <Popover arrow={false}>
                                        Click me to clear the filter.
                                    </Popover>
                                }
                            >
                                <button onClick={resetRoomType}>房型</button>
                            </Whisper>
                        </div>
                        <div className="roomType_flex">
                            <input
                                className="checkbox-tools"
                                type="checkbox"
                                name="tools"
                                id="tool-1"
                                value={1}
                                onClick={RoomTypeHandler}
                                checked={checkroomType.includes("1")}
                            />
                            <label
                                className="for-checkbox-tools"
                                htmlFor="tool-1"
                            >
                                <i className="fa-solid fa-campground"></i>
                                頂級網美
                            </label>
                            <input
                                className="checkbox-tools"
                                type="checkbox"
                                name="tools"
                                id="tool-2"
                                value={2}
                                onClick={RoomTypeHandler}
                                checked={checkroomType.includes("2")}
                            />
                            <label
                                className="for-checkbox-tools"
                                htmlFor="tool-2"
                            >
                                <i className="fa-solid fa-tents"></i>
                                溫馨親子
                            </label>
                            <input
                                className="checkbox-tools"
                                type="checkbox"
                                name="tools"
                                id="tool-3"
                                value={3}
                                onClick={RoomTypeHandler}
                                checked={checkroomType.includes("3")}
                            />
                            <label
                                className="for-checkbox-tools"
                                htmlFor="tool-3"
                            >
                                <i className="fa-solid fa-caravan"></i>
                                高級露營車
                            </label>
                            <input
                                className="checkbox-tools"
                                type="checkbox"
                                name="tools"
                                id="tool-4"
                                value={4}
                                onClick={RoomTypeHandler}
                                checked={checkroomType.includes("4")}
                            />
                            <label
                                className="for-checkbox-tools"
                                htmlFor="tool-4"
                            >
                                <i className="fa-solid fa-person-hiking"></i>
                                不求人露營
                            </label>
                        </div>
                    </div>
                    <div className="room_filter_roomSelect">
                        <div className="room_title roomSelect_title">
                            <Whisper
                                followCursor
                                speaker={
                                    <Popover arrow={false}>
                                        Click me to clear the filter.
                                    </Popover>
                                }
                            >
                                <button onClick={resetRoomSelecor}>房間</button>
                            </Whisper>
                        </div>
                        <div className="roomSelect_area">
                            {roomList &&
                                roomList.map((v, i) => {
                                    return (
                                        <Fragment key={i}>
                                            <input
                                                className="checkbox-roomSelect"
                                                type="checkbox"
                                                name="checkbox-roomSelect"
                                                id={"roomSelect-" + i}
                                                checked={roomSelector.includes(
                                                    v.sid + ""
                                                )}
                                                value={v.sid}
                                                onChange={RoomSelectHandler}
                                            />
                                            <label
                                                className="for-checkbox-roomSelect"
                                                htmlFor={"roomSelect-" + i}
                                            >
                                                <span className="text">
                                                    {v.room_name}
                                                </span>
                                            </label>
                                        </Fragment>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="room_filter_price">
                        <div className="room_title room_price_title">
                            <Whisper
                                followCursor
                                speaker={
                                    <Popover arrow={false}>
                                        Click me to clear the filter.
                                    </Popover>
                                }
                            >
                                <button onClick={resetPrice}>價格</button>
                            </Whisper>
                        </div>
                        <Row>
                            <Col md={20}>
                                <RangeSlider
                                    progress
                                    min={0}
                                    step={10}
                                    max={21000}
                                    value={value}
                                    onChange={(value) => {
                                        setValue(value);
                                        setBookingList({
                                            ...bookingList,
                                            startPrice: value[0],
                                            endPrice: value[1],
                                        });
                                    }}
                                />
                            </Col>
                            <Col md={20} style={{ marginTop: 16 }}>
                                <InputGroup>
                                    <InputNumber
                                        min={0}
                                        max={21000}
                                        value={value[0]}
                                        onChange={(nextValue) => {
                                            const [start, end] = value;
                                            if (nextValue > end) {
                                                return;
                                            }
                                            setValue([nextValue, end]);
                                            setBookingList({
                                                ...bookingList,
                                                startPrice: nextValue,
                                            });
                                        }}
                                    />
                                    <InputGroup.Addon>to</InputGroup.Addon>
                                    <InputNumber
                                        min={800}
                                        max={21000}
                                        value={value[1]}
                                        onChange={(nextValue) => {
                                            const [start, end] = value;
                                            if (start > nextValue) {
                                                return;
                                            }
                                            setValue([start, nextValue]);
                                            setBookingList({
                                                ...bookingList,
                                                endPrice: nextValue,
                                            });
                                        }}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </div>
                    <div className="room_filter_tag">
                        <div className="room_title roomTag_title">
                            <Whisper
                                followCursor
                                speaker={
                                    <Popover arrow={false}>
                                        Click me to clear the filter.
                                    </Popover>
                                }
                            >
                                <button onClick={resetTag}>標籤</button>
                            </Whisper>
                        </div>
                        <div className="room_tag_area">
                            {tagList.map((t, ti) => {
                                return (
                                    <Fragment key={ti}>
                                        <input
                                            className="checkbox-booking"
                                            type="checkbox"
                                            name="booking"
                                            id={"booking-" + (ti + 1)}
                                            value={t.t_id}
                                            onChange={tagHandler}
                                            checked={tagValue.includes(
                                                t.t_id + ""
                                            )}
                                        />
                                        <label
                                            className="for-checkbox-booking"
                                            htmlFor={"booking-" + (ti + 1)}
                                        >
                                            <span className="text">
                                                {t.type}
                                            </span>
                                        </label>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </div>
                    <div className="room_filter_people_say">
                        <div className="room_title roomPeople_title">
                            <Whisper
                                followCursor
                                speaker={
                                    <Popover arrow={false}>
                                        Click me to clear the filter.
                                    </Popover>
                                }
                            >
                                <button
                                    onClick={() => {
                                        resetPeople();
                                    }}
                                >
                                    大家怎麼說
                                </button>
                            </Whisper>
                        </div>
                        <div className="roomPeople_area">
                            <input
                                className="checkbox-people"
                                type="checkbox"
                                name="peopole"
                                id="people-1"
                                onChange={popularHandler}
                                checked={popular}
                            />
                            <label
                                className="for-checkbox-people"
                                htmlFor="people-1"
                            >
                                <span className="text">popular</span>
                            </label>
                            <input
                                className="checkbox-people"
                                type="checkbox"
                                name="people"
                                id="people-2"
                                onChange={recommendHandler}
                                checked={recommend}
                            />
                            <label
                                className="for-checkbox-people"
                                htmlFor="people-2"
                            >
                                <span className="text">recommand</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingFilter;
