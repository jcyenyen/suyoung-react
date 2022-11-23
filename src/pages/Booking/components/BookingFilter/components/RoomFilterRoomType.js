import React from 'react'
import { useBookingList } from "../../../../../utils/useBookingList";
import {Whisper,Popover} from "rsuite";
import { useState } from 'react';
import { motion } from "framer-motion";
import { TiDelete } from "react-icons/ti";

function RoomFIlterRoomType(props) {

    // 房型確認狀態
    const {checkroomType, setCheckRoomType} = props;

    /* ------ useContext 的值 ------ */
    const { bookingList, setBookingList } = useBookingList();

    // 篩選器跳出開關
    const [open, setOpen] = useState(true);
    
    // RoomType 房型控制器
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

     /* reset */
    const resetRoomType = () => {
        setBookingList({ ...bookingList, roomType: [] });
        setCheckRoomType([]);
    };

    return (
    <>
        <div className="room_title roomType_title">
            <Whisper
                followCursor
                placement="top"
                speaker={
                    <Popover arrow={false}>
                        Click
                    </Popover>
                }
            >
                <button onClick={()=>{setOpen(!open)}}>房型</button>
            </Whisper>
            {open ? (
            <motion.button 
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity:0, y: -100 }}
                transition={{
                        duration: 0.5,
                        default: { ease: "linear" },
                }}
                className='delete_filter_roomType' 
                onClick={resetRoomType}> 
                <TiDelete size={28} />
            </motion.button>):null}
        </div>
        {open ? (
            
            <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity:0, y: -100 }}
                    transition={{
                            duration: 0.5,
                            default: { ease: "linear" },
                    }}
                    className="roomType_flex"
                >
                <input
                    className="checkbox-tools"
                    type="checkbox"
                    name="tools"
                    id="tool-1"
                    value={1}
                    onChange={RoomTypeHandler}
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
                    onChange={RoomTypeHandler}
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
                    onChange={RoomTypeHandler}
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
                    onChange={RoomTypeHandler}
                    checked={checkroomType.includes("4")}
                />
                <label
                    className="for-checkbox-tools"
                    htmlFor="tool-4"
                >
                    <i className="fa-solid fa-person-hiking"></i>
                    不求人露營
                </label>
            </motion.div>): null}
                        
    </>
  )
}

export default RoomFIlterRoomType
