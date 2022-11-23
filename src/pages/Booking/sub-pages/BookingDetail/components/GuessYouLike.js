import React, { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useBookingList } from "../../../../../utils/useBookingList";
import {motion} from "framer-motion";

function GuessYouLike(props) {
    const { otherRoomList } = props;
    const { bookingList, setBookingList } = useBookingList();
    const seeMore = (v) => {
        const roomSid =  v;
        // console.log(roomSid);
        setBookingList({
            ...bookingList,
            roomSelector: [roomSid + ""],
        });
        Navigate("/shuyoung/Booking");
    }
    return (
        <>
            <div className="guess_container">
                <motion.div 
                initial={{ opacity: 0, y:200 }}
                whileInView={{ opacity: 1, y:0 }}
                transition={{
                delay: 0.2,
                default: { ease: "linear" },
                }} className="guess_title">
                    <h1 id="guess_h1">GUESS YOU LIKE</h1>
                </motion.div>
                <motion.div 
                initial={{ opacity: 0, y:200 }}
                whileInView={{ opacity: 1, y:0 }}
                transition={{
                delay: 0.2,
                default: { ease: "linear" },
                }}
                className="guess_card_flex">
                    {otherRoomList.map((v, i) => {
                        return (
                            <motion.div 
                                initial={{ opacity: 0, y:200 }}
                                whileInView={{ opacity: 1, y:0 }}
                                transition={{
                                delay: 0.2,
                                default: { ease: "linear" },
                                }}
                                className="guess_card" key={i}
                            >
                                <div className="guess_images">
                                    <img
                                        className="guess_img"
                                        src={
                                            "/room_imgs/" +
                                            v.room_folder +
                                            "/" +
                                            v.room_image
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="guess_content">
                                    <div className="guess_content_title">
                                        {v.room_name}
                                    </div>
                                    <div className="guess_content_subtitle">
                                        {v.person_num}人房 {v.person_num / 2}
                                        張雙人床
                                    </div>
                                    
                                    <div className="guess_content_paragragh">
                                        {v.description}
                                    </div>
                                    <div className="guess_content_price">
                                        NTD: <span>{v.room_price}</span> / 晚
                                        
                                    </div>

                                    <div className="guess_content_seemore">
                                    <Link
                                        to="/shuyoung/Booking"
                                    >
                                    <button onClick={() => {
                                            setBookingList({
                                                ...bookingList,
                                                roomSelector: [v.sid + ""],
                                            });
                                        }}>看更多</button>
                                        
                                    </Link>
                                        
                                    </div>
                                    
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </>
    );
}

export default GuessYouLike;
