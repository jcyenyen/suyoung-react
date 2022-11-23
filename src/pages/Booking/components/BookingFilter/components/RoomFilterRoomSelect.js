import React, {Fragment , useState}from 'react'
import { useBookingList } from "../../../../../utils/useBookingList";
import {Whisper,Popover} from "rsuite";
import { motion } from "framer-motion";
import { TiDelete } from "react-icons/ti";

function RoomFilterRoomSelect(props) {

    //檢查房間狀態 和 roomList 跑 map 
    const {roomSelector, setRoomSelector, roomList} = props;

     /* ------ useContext 的值 ------ */
    const { bookingList, setBookingList } = useBookingList();

    // 篩選器跳出開關
    const [open, setOpen] = useState(true);

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

     /* reset */
    const resetRoomSelecor = () => {
        setBookingList({ ...bookingList, roomSelector: [] });
        setRoomSelector([]);
    };

  return (
    <>
    
        <div className="room_title roomSelect_title">
            <Whisper
                followCursor
                placement="top"
                speaker={
                    <Popover arrow={false}>
                        Click
                    </Popover>
                }
            >
                <button onClick={()=>{setOpen(!open)}}>房間</button>
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
                    onClick={resetRoomSelecor}> 
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
                    }} className="roomSelect_area">
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
            </motion.div> 
            ): null }
    </>
  )
}

export default RoomFilterRoomSelect
