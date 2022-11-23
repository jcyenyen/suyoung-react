import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../Login/sub-pages/AuthProvider";

const OrderListGroup = (props) => {
    const { setAuth, ...auth } = useAuth();

    const { orderList } = props;

    useEffect(() => {
        if (orderList.length) {
            let groups = gsap.utils.toArray(".order-list-group");
            let toggles = gsap.utils.toArray(".order-list-toggle");
            let listToggles = groups.map(createAnimation);

            toggles.forEach((toggle) => {
                toggle.addEventListener("click", function () {
                    toggleMenu(toggle);
                });
            });

            function toggleMenu(clickedToggle) {
                listToggles.forEach((toggleFn) => toggleFn(clickedToggle));
            }
            function createAnimation(element) {
                let menu = element.querySelector(".order-list-toggle");
                let box = element.querySelector(".order-list");

                gsap.set(box, { height: "auto" });
                let animation = gsap
                    .from(box, {
                        height: 0,
                        duration: 0.5,
                        ease: "power1.inOut",
                    })
                    .reverse();

                return function (clickedMenu) {
                    if (clickedMenu === menu) {
                        animation.reversed(!animation.reversed());
                    } else {
                        animation.reverse();
                    }
                };
            }
        }
    }, [orderList]);

    return (
        <>
            {orderList.map((v, i) => {
                return (
                    <motion.div
                        key={i}
                        className="order-list-group"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.5,
                            default: { ease: "linear" },
                        }}
                    >
                        <div className="order-list-toggle">
                            <div className="img">
                                <img
                                    src={`http://localhost:3777/room_imgs/${v.room_folder}/${v.room_image}`}
                                />
                            </div>
                            <div className="text">
                                <div className="top">
                                    <div>
                                        訂單編號:
                                        <br />
                                        {v.order_id}
                                    </div>
                                    {v.room_name}
                                </div>
                                <div className="bottom">
                                    {v.start_date.join("/")} -{" "}
                                    {v.end_date.join("/")}
                                </div>
                            </div>
                        </div>
                        <div className="order-list">
                            <div className="left">
                                <img
                                    src={`http://localhost:3777/room_imgs/${v.room_folder}/${v.room_image}`}
                                    alt=""
                                />
                                <div className="temp-name">{v.room_name}</div>
                                {/* <div className="temp-amount">
                            帳數:<span>2</span>
                        </div> */}
                            </div>
                            <div className="right">
                                <div className="right-top">
                                    <div className="check-in-time">
                                        <div>入住時間:</div>
                                        <div>
                                            <span>{v.start_date[1]}</span>月
                                            <span>{v.start_date[2]}</span>日
                                        </div>
                                    </div>
                                    <div className="check-out-time">
                                        <div>退房時間:</div>
                                        <div>
                                            <span>{v.end_date[1]}</span>月
                                            <span>{v.end_date[2]}</span>日
                                        </div>
                                    </div>
                                    <div className="check-in-member">
                                        <div>入住人數:</div>
                                        <div className="wrap">
                                            <div>
                                                <span>{v.adults}</span>位大人
                                            </div>

                                            <div>
                                                <span>{v.kids}</span>位小孩
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-bottom">
                                    <div className="check">
                                        <i className="fa-regular fa-rectangle-list"></i>
                                        <div>價格</div>
                                    </div>
                                    <div className="night">
                                        <div>
                                            {v.room_name} *{" "}
                                            <span>{v.perNight}</span>晚
                                        </div>
                                        <div>
                                            <span>{v.room_price}</span>元
                                        </div>
                                    </div>
                                    <div className="plus">
                                        <div>
                                            活動：
                                            <span>{v.act_name}</span>*
                                            <span>{v.adults}</span>人
                                        </div>
                                        <div>
                                            <span>{v.act_price}</span>元
                                        </div>
                                    </div>

                                    <div className="total-price">
                                        <div className="checkmore-btn">
                                            <Link to="/shuyoung/SuMap">
                                                點我看地圖
                                            </Link>
                                        </div>
                                        <div className="checkmore-btn">
                                            <Link to="/shuyoung/Booking">
                                                點我看房型介紹
                                            </Link>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: "1rem" }}>
                                                折扣後
                                            </span>
                                            <span> {v.total_price}</span>元
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </>
    );
};

export default OrderListGroup;
