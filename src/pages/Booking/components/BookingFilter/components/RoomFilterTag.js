import React , {Fragment, useState}from 'react'
import { useBookingList } from "../../../../../utils/useBookingList";
import {Whisper,Popover} from "rsuite";
import { motion } from "framer-motion";
import { TiDelete } from "react-icons/ti";

function RoomFilterTag(props) {
    // 檢查標籤狀態
    const {tagValue, setTagValue, tagList} = props;

    /* ------ useContext 的值 ------ */
    const { bookingList, setBookingList } = useBookingList();

    // 篩選器跳出開關
    const [open, setOpen] = useState(true);

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

     /* reset */
    const resetTag = () => {
        setBookingList({ ...bookingList, tagCheck: [] });
        setTagValue([]);
    };

    return (
    <>
        <div className="room_title roomTag_title">
            <Whisper
                followCursor
                placement="top"
                speaker={
                    <Popover arrow={false}>
                        Click
                    </Popover>
                }
            >
                <button onClick={()=>{setOpen(!open)}}>標籤</button>
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
                    onClick={resetTag}> 
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
            className="room_tag_area">
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
        </motion.div>):null}
        
    </>
  )
}

export default RoomFilterTag
