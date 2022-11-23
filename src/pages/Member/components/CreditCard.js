import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/member-credit-card.scss";
import { motion } from "framer-motion";
import CreditCardCard from "./CreditCardCard";

const CreditCard = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="member-body"
            >
                <div className="member-title">信用卡管理</div>
                <div className="credit-card-container">
                    <CreditCardCard />
                </div>
            </motion.div>
        </>
    );
};

export default CreditCard;
