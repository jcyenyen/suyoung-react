import React , {useState, Fragment}from 'react'
import { useBookingList } from "../../../../../utils/useBookingList";
import { RangeSlider, Row, Col, InputGroup, InputNumber, Drawer } from "rsuite";




function RoomFilterMobile(props) {
    const{checkroomType, setCheckRoomType, roomSelector, setRoomSelector, value, setValue, tagValue, setTagValue,recommend,setRecommend,popular,setPopular,roomList,tagList,checkPrice,setCheckPrice} = props;

    const { bookingList, setBookingList } = useBookingList();

    
    /* ------ 所有篩選條件的控制器 ------ */

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
        }else {
                // else -> 直接取代
                
                //存回去roomType
                setBookingList({
                    ...bookingList,
                    searchPrice: value,
                });
                setCheckPrice(value);
        }
        
        
    }

    //  房型 控制器
    const RoomTypeHandler = (e) => {
        const value = e.target.value;
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

    /* --------mobile 篩選 -----------*/
    const [RTOpen, setRTOpen] = useState(false);
    const [ROpen, setROpen] = useState(false);
    const [POpen, setPOpen] = useState(false);
    const [tagOpen, setTagOpen] = useState(false);
    const [PeOpen, setPeOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

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
        if (v === 6) setSortOpen(true);
    };



  return (
    <>
        <div className="room_btn_flex">
        <button
                onClick={() => {
                    handleOpen("bottom");
                    openHandler(6);
                }}
            >
                排序
            </button>
            <Drawer
                placement={placement}
                open={sortOpen}
                onClose={() => setSortOpen(false)}
                size={"xs"}
            >
                <Drawer.Header>
                    <Drawer.Title>排序</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                <div className='roomSearch_check'>
                        <input
                            className="checkbox-priceUp"
                            type="checkbox"
                            name="priceUp"
                            
                            id={"priceUp-1"}
                            value={1}
                            onChange={SearchPrice}
                            checked={checkPrice.includes(
                                1 + ""
                            )}
                        />
                        <label
                            className="for-checkbox-priceUp"
                            htmlFor={"priceUp-1"}
                        >
                            <span className="text">
                                價格由低到高
                            </span>
                        </label>
                        <input
                            className="checkbox-priceUp"
                            type="checkbox"
                            name="priceUp"
                            id={"priceUp-2"}
                            value={2}
                            onChange={SearchPrice}
                            checked={checkPrice.includes(
                                2 + ""
                            )}
                        />
                        <label
                            className="for-checkbox-priceUp"
                            htmlFor={"priceUp-2"}
                        >
                            <span className="text">
                                價格由高到低
                            </span>
                        </label>
                    </div>
                </Drawer.Body>
            </Drawer>
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
                            onChange={RoomTypeHandler}
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
                            onChange={RoomTypeHandler}
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
                            onChange={RoomTypeHandler}
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
                            onChange={RoomTypeHandler}
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
    </>
  )
}



export default RoomFilterMobile
