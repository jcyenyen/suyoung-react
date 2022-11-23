import React, { useEffect, useState } from "react";
import { useAuth } from "../../Login/sub-pages/AuthProvider";
import axios from "axios";

const CreditCardCard = () => {
    const { setAuth, ...auth } = useAuth();

    const [creditCard, setCreditCard] = useState([]);

    const getCreditCard = async () => {
        const res = await axios.get(
            `http://localhost:3700/member/creditcard/?memberId=${auth.m_id}`
        );
        // res.data.result.forEach((item) => {
        //     item.card_number_hidden = item.card_number.map((number, i) => {
        //         return i === 1 || i === 2 ? "****" : number;
        //     });
        // });
        res.data.result.map((item, index) => {
            item.card_number_hidden = item.card_number.map((number, i) => {
                return i === 1 || i === 2 ? "****" : number;
            });
        });
        setCreditCard([...res.data.result]);
    };

    useEffect(() => {
        getCreditCard();
    }, []);

    const deleteCard = async (cardSid) => {
        await axios
            .delete(
                `http://localhost:3700/member/creditcard/?memberId=${auth.m_id}&cardSid=${cardSid}`
            )
            .then((res) => {
                // console.log(res);
                getCreditCard();
            });
    };

    return (
        <>
            {creditCard.map((v, i) => {
                return (
                    <div key={i} className="member-credit-card">
                        <div className="info">
                            <i className="fa-brands fa-cc-visa fa-xl"></i>
                            {/* <div className="bank">中華郵政</div> */}
                            <div>{v.card_number_hidden.join("-")}</div>
                        </div>
                        <div className="member-credit-card-delete">
                            <button
                                onClick={() => {
                                    deleteCard(v.card_id);
                                }}
                            >
                                刪除
                            </button>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default CreditCardCard;
