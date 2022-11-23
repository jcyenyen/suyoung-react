import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../Login/sub-pages/AuthProvider";
import { TiDelete } from "react-icons/ti";
import { useBookingList } from "../../../utils/useBookingList";

const KeepCard = (props) => {
    const { ...auth } = useAuth();

    const { bookingList, setBookingList } = useBookingList();

    const { favlist1, setFavlist1 } = props;

    const getData = async () => {
        const res = await axios.get(
            `http://localhost:3700/member/favlist/${auth.m_id}`
        );

        // console.log(res.data);
        const favlist = res.data;

        setFavlist1(favlist.room);
    };

    const deleteKeep = async (sid) => {
        const room_sid = sid;

        const res = await axios.delete(
            `http://localhost:3700/member/favlist?member=${auth.m_id}&roomSid=${room_sid}`
        );

        // console.log(res);

        getData();
    };

    return (
        <>
            {favlist1.map((v, i) => {
                return (
                    <motion.div
                        className="keep-card"
                        key={i}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.5,

                            default: { ease: "linear" },
                        }}
                    >
                        <button
                            className="delete-keep"
                            onClick={() => {
                                deleteKeep(v.sid);
                            }}
                        >
                            <TiDelete size={28} />
                        </button>
                        <div className="keep-card-img">
                            <img
                                src={`http://localhost:3777/room_imgs/${v.room_folder}/${v.room_image}`}
                                alt=""
                            />
                        </div>
                        <div className="keep-card-title">{v.room_name}</div>
                        <div className="keep-card-content">{v.description}</div>
                        <div className="keep-card-button">
                            <Link
                                to="/shuyoung/Booking"
                                onClick={() => {
                                    setBookingList({
                                        ...bookingList,
                                        roomSelector: [v.sid + ""],
                                    });
                                }}
                            >
                                看更多
                            </Link>
                        </div>
                    </motion.div>
                );
            })}
        </>
    );
};

export default KeepCard;
