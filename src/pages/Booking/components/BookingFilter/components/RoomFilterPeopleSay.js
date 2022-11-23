import React, {useState} from 'react'
import { useBookingList } from "../../../../../utils/useBookingList";
import {Whisper,Popover} from "rsuite";
import { motion } from "framer-motion";
import { TiDelete } from "react-icons/ti";

function RoomFilterPeopleSay(props) {

    // 檢查大家怎麼說狀態
    const {recommend, setRecommend, popular, setPopular} = props;

     /* ------ useContext 的值 ------ */
    const { bookingList, setBookingList } = useBookingList();

    // 篩選器跳出開關
    const [open, setOpen] = useState(true);

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

    /* ----- reset -----*/
    const resetPeople = () => {
        setPopular(1);
        setRecommend(1);
        setBookingList({ ...bookingList, popular: "", recommend: "" });
    };

    return (
    <>
        <div className="room_title roomPeople_title">
            <Whisper
                followCursor
                placement="top"
                speaker={
                    <Popover arrow={false}>
                        Click
                    </Popover>
                }
            >
                <button
                    onClick={()=>{setOpen(!open)}}
                >
                    大家怎麼說
                </button>
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
                    onClick={resetPeople}> 
                    <TiDelete size={28} />
                </motion.button>):null}
        </div>
        {open ? (<motion.div 
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity:0, y: -100 }}
                transition={{
                        duration: 0.5,
                        default: { ease: "linear" },
                }}
            className="roomPeople_area">
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
        </motion.div>):null}
        
    </>
  )
}

export default RoomFilterPeopleSay
