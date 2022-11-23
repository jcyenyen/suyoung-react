import React, { useState, useEffect } from "react";
import "../styles/member-coupon.scss";
import { motion } from "framer-motion";

import { useAuth } from "../../../pages/Login/sub-pages/AuthProvider";
import axios from "axios";

const Coupon = (props) => {
    const { setAuth, ...auth } = useAuth();

    const [discount, setDiscount] = useState([]);

    useEffect(() => {
        const getCoupon = async () => {
            const res = await axios.get(
                `http://localhost:3700/member/coupon/${auth.m_id}/`
            );

            const result = res.data.result;
            // console.log(result);

            let coupon = [];

            result.map((v, i) => {
                coupon.push({
                    discount: v.coupon_discount,
                    discount_number: v.discount_number,
                    discount_name: v.discount_name,
                    start_date: v.m_start_date,
                    expireDate: v.m_expire_date,
                    coupon_status: v.coupon_status,
                });
                return coupon;
            });

            setDiscount(coupon);
        };

        getCoupon();
    }, []);

    var todayDate = new Date();

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="member-body"
            >
                <div className="coupon-container">
                    <div className="member-title">我的優惠券</div>
                    <div className="coupon-box">
                        <div className="left">
                            {discount.map((v, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="coupon"
                                        style={
                                            v.coupon_status === 1 ||
                                            todayDate > new Date(v.expireDate)
                                                ? {
                                                      filter: "saturate(0) brightness(0.4)",
                                                      pointerEvents: "none",
                                                  }
                                                : null
                                        }
                                    >
                                        <div className="coupon-number">
                                            {v.discount_number}
                                        </div>
                                        <span className="discount-name">
                                            {v.discount_name}
                                        </span>
                                        <span className="discount-date">
                                            使用期限:
                                        </span>
                                        <div className="date">
                                            <span className="start-date">
                                                {v.start_date}
                                            </span>
                                            至
                                            <span className="expire-date">
                                                {v.expireDate}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Coupon;
