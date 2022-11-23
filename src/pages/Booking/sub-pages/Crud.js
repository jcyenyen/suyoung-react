import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import Axios from "axios";
import { Link } from "react-router-dom";

function Index(props) {
    // 所有room 列表
    const [roomList, setRoomList] = useState([]);
    // const { step, setStep } = props;

    // 新建房間
    const createRoom = () => {
        props.setStep(0);
    };

    // 用get 取得所有的值
    const getData = () => {
        Axios.get("http://localhost:3700/booking/select").then((response) => {
            setRoomList(response.data);
            console.log(response.data);
        });
    };

    //用 delete 回傳後面的object 給 node 後端 刪除
    // 夾帶roomName 回去給後端
    const deleteReview = (roomName) => {
        Axios.delete(`http://localhost:3700/booking/delete/${roomName}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // 將取到的值呈現出來 componentDidMount()
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {props.roomList ? setRoomList(props.roomList) : null}
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h5>CRUD</h5>
                    </div>

                    <div className="col">
                        <button
                            type="button"
                            className="btn"
                            onClick={createRoom}
                        >
                            create
                        </button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Room_type</th>
                                    <th scope="col">Room_name</th>
                                    <th scope="col">Room_price</th>
                                    <th scope="col">Person_number</th>
                                    <th scope="col">Room_recommend</th>
                                    <th scope="col">Room_img</th>
                                    <th scope="col">Delete</th>
                                    <th scope="col">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomList &&
                                    roomList.map((v, i) => {
                                        return (
                                            <tr key={i}>
                                                <th scope="row">{v.sid}</th>
                                                <td>{v.room_type}</td>
                                                <td>{v.room_name}</td>
                                                <td>{v.room_price}</td>
                                                <td>{v.person_num}</td>
                                                <td>{v.recommend}</td>
                                                <td>{v.room_image}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        // 觸發axios 並帶著room_name
                                                        onClick={() => {
                                                            deleteReview(
                                                                v.room_name
                                                            );
                                                        }}
                                                    >
                                                        delete
                                                    </button>
                                                </td>

                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={() => {
                                                            // 開啟 編輯新頁
                                                            props.setStep(1);
                                                            const newSid =
                                                                v.sid;
                                                            // 傳送現在的sid 給 update
                                                            props.setRoomID(
                                                                newSid
                                                            );
                                                            console.log(newSid);
                                                        }}
                                                    >
                                                        update
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
