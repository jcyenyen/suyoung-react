import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/member-keep.scss";
import { motion } from "framer-motion";
import { useAuth } from "../../Login/sub-pages/AuthProvider";
import KeepCard from "./keepCard";
import KeepCard2 from "./keepCard2";
import axios from "axios";

const Keep = () => {
    const { setAuth, ...auth } = useAuth();

    const [favlist1, setFavlist1] = useState([]);
    const [favlist2, setFavlist2] = useState([]);

    const getData = async () => {
        const res = await axios.get(
            `http://localhost:3700/member/favlist/${auth.m_id}`
        );

        // console.log(res);

        const favlist = res.data;

        setFavlist1(favlist.room);
        setFavlist2(favlist.act);
    };

    useEffect(() => {
        getData();
    }, []);

    const [isShow, setIsShow] = useState(true);
    const [isShow2, setIsShow2] = useState(true);

    const checkboxHandler = () => {
        setIsShow(!isShow);
    };
    const checkboxHandler2 = () => {
        setIsShow2(!isShow2);
    };

    return (
        <>
            <>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="member-body"
                >
                    <div className="keep-title">收藏清單</div>
                    <div className="keep-checkbox">
                        <label>
                            <input
                                className="room-type"
                                type="checkbox"
                                name="room-type"
                                value="房型"
                                checked={isShow}
                                onChange={checkboxHandler}
                            />
                            <span className="round button">房型</span>
                        </label>
                        <label>
                            <input
                                className="act-type"
                                type="checkbox"
                                name="activity-type"
                                value="活動"
                                checked={isShow2}
                                onChange={checkboxHandler2}
                            />
                            <span className="round button">活動</span>
                        </label>
                    </div>
                    <div className="keep-card-container">
                        {isShow && (
                            <KeepCard
                                favlist1={favlist1}
                                setFavlist1={setFavlist1}
                            />
                        )}
                        {isShow2 && (
                            <KeepCard2
                                favlist2={favlist2}
                                setFavlist2={setFavlist2}
                            />
                        )}
                    </div>
                </motion.div>
            </>
        </>
    );
};

export default Keep;
