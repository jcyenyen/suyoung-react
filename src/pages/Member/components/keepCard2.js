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

    const { favlist2, setFavlist2 } = props;

    const getData = async () => {
        const res = await axios.get(
            `http://localhost:3700/member/favlist/${auth.m_id}`
        );

        // console.log(res.data);
        const favlist = res.data;

        setFavlist2(favlist.act);
    };

    const deleteKeep = (actSid) => {
        axios
            .delete(
                `http://localhost:3700/member/favlist/act/delete?memberId=${auth.m_id}&favlistId=${actSid}`
            )
            .then((res) => {
                // console.log(res);
                getData();
            });
    };

    return (
        <>
            {favlist2.map((v, i) => {
                return (
                    <motion.div
                        key={i}
                        className="keep-card"
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
                                deleteKeep(v.act_id);
                            }}
                        >
                            <TiDelete size={28} />
                        </button>
                        <div className="keep-card-img">
                            <img
                                src={`http://localhost:3777/act_imgs/${v.filename}`}
                                alt=""
                            />
                        </div>
                        <div className="keep-card-title">{v.act_name}</div>
                        <div className="keep-card-content">{v.act_desc}</div>
                        <div className="keep-card-button">
                            <Link to="/shuyoung/Act/Atv">看更多</Link>
                        </div>
                    </motion.div>
                );
            })}
        </>
    );
};

export default KeepCard;
