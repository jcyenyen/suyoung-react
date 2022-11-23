import React ,{useState} from 'react'
import { useBookingList } from "../../../../../utils/useBookingList";
import {Whisper,Popover} from "rsuite";
import { RangeSlider, Row, Col, InputGroup, InputNumber } from "rsuite";
import { motion } from "framer-motion";
import { TiDelete } from "react-icons/ti";

function RoomFilterPrice(props) {

    // 檢查價格狀態
    const {value, setValue} = props;

    /* ------ useContext 的值 ------ */
    const { bookingList, setBookingList } = useBookingList();

    // 篩選器跳出開關
    const [open, setOpen] = useState(true);

     /* reset */
    const resetPrice = () => {
        setBookingList({ ...bookingList, startPrice: "", endPrice: "" });
        setValue([1000, 5000]);
    };
    return (
    <>
        <div className="room_title room_price_title">
            <Whisper
                followCursor
                placement="top"
                speaker={
                    <Popover arrow={false}>
                        Click
                    </Popover>
                }
            >
                <button onClick={()=>{setOpen(!open)}}>價格</button>
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
                    onClick={resetPrice}> 
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
                >
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
                                    const [end] = value;
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
                                    const [start] = value;
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
            </motion.div>
            ):null}
            
    </>
  )
}

export default RoomFilterPrice
