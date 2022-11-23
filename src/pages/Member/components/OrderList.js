import React, { useEffect, useState } from "react";
import "../styles/member-order-list.scss";
import { motion } from "framer-motion";
import OrderListGroup from "./OrderListGroup";
import { useAuth } from "../../Login/sub-pages/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const OrderList = () => {
    const { setAuth, ...auth } = useAuth();

    const [orderList, setOrderList] = useState([]);

    const [searchInput, setSearchInput] = useState("");

    // useEffect(()=>{
    //     orderList.map((v,i)=>{

    //         roomName.push(v.room_name);

    //         console.log(roomName);

    //     })

    // },[orderList])

    const monthOptions = ["一個月內", "三個月內", "六個月內"];

    const [month, setMonth] = useState("");

    const getData = async () => {
        const res = await axios.get(
            `http://localhost:3700/member/getOrderList/${auth.m_id}/?month=${month}`
        );

        const act = res.data.act;
        const room = res.data.room;

        // console.log(act);
        // console.log(room);

        function mergeDuplicateObject(arr1, arr2) {
            const newArr = arr1.map((item, index) => {
                if (item.order_id !== arr2[index].order_id)
                    throw new Error("item ID doesn't match");

                for (let key in item) {
                    item[key] = !!item[key] ? item[key] : arr2[index][key];
                }

                return item;
            });
            return newArr;
        }

        setOrderList(mergeDuplicateObject(act, room));

        // setOrderList(res.data.result);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, [month]);

    useEffect(() => {
        if (searchInput === "") {
            getData();
        }
    }, [searchInput]);

    const searchItems = () => {
        if (searchInput !== "") {
            const filterData = orderList.filter((item) => {
                return Object.values(item).join("").includes(searchInput);
            });

            // console.log(filterData);

            setOrderList(filterData);
        } else {
            getData();
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="member-body"
            >
                <div className="keep-title">訂單記錄</div>
                <div className="search">
                    <div className="search-order-input">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="搜尋..."
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        className="search-button"
                        onClick={() => {
                            searchItems();
                        }}
                    >
                        搜尋
                    </button>
                </div>
                <div className="checkbox">
                    {monthOptions.map((v, i) => {
                        return (
                            <>
                                <label className="month-choose" key={i}>
                                    <input
                                        type="radio"
                                        name="month"
                                        value={v}
                                        onChange={(e) => {
                                            setMonth(e.target.value);
                                            // console.log(e.target.value);
                                        }}
                                    />
                                    <span className="month-round button">
                                        {v}
                                    </span>
                                </label>
                            </>
                        );
                    })}
                </div>
                <div className="order-list-container">
                    <OrderListGroup orderList={orderList} />
                </div>
            </motion.div>
        </>
    );
};

export default OrderList;
