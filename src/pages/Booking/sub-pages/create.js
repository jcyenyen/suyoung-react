import React, { useState } from "react";
import Axios from "axios";

function Create(props) {
    //設定每一個input 的 狀態
    const [roomState, setroomState] = useState({
        roomType: "",
        roomName: "",
        roomPrice: "",
        personNum: "",
        roomImg: "",
        roomRec: 0,
    });

    // 所有room 列表
    const [roomList, setRoomList] = useState([]);
    //用 post 回傳後面的object 給 node 後端
    const submitReview = () => {
        Axios.post("http://localhost:3700/booking/add", roomState)
            .then(() => {
                setRoomList([...roomList, { roomState }]);
            })
            .catch((err) => {
                alert("err:", err);
            });
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h3>Add room</h3>
                        <form name="form1">
                            <div className="mb-3">
                                <label
                                    htmlFor="room_type"
                                    className="form-label"
                                >
                                    Room type
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="room_type"
                                    name="room_type"
                                    onChange={(e) => {
                                        const newRoomList = {
                                            ...roomState,
                                            roomType: e.target.value,
                                        };
                                        setroomState(newRoomList);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="room_name"
                                    className="form-label"
                                >
                                    Room name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="room_name"
                                    name="room_name"
                                    onChange={(e) => {
                                        const newRoomList = {
                                            ...roomState,
                                            roomName: e.target.value,
                                        };
                                        setroomState(newRoomList);
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="room_price"
                                    className="form-label"
                                >
                                    Room price
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="room_price"
                                    name="room_price"
                                    onChange={(e) => {
                                        const newRoomList = {
                                            ...roomState,
                                            roomPrice: e.target.value,
                                        };
                                        setroomState(newRoomList);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="person_num"
                                    className="form-label"
                                >
                                    Person number
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="person_num"
                                    name="person_num"
                                    onChange={(e) => {
                                        const newRoomList = {
                                            ...roomState,
                                            personNum: e.target.value,
                                        };
                                        setroomState(newRoomList);
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="room_image"
                                    className="form-label"
                                >
                                    room_image
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="room_image"
                                    name="room_image"
                                    onChange={(e) => {
                                        const newRoomList = {
                                            ...roomState,
                                            roomImg: e.target.value,
                                        };
                                        setroomState(newRoomList);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="checkbox"
                                    id="recommend"
                                    name="recommend"
                                    value="1"
                                    onChange={(e) => {
                                        const newRoomList = {
                                            ...roomState,
                                            roomRec: e.target.value,
                                        };
                                        setroomState(newRoomList);
                                    }}
                                />
                                <label
                                    htmlFor="recommend"
                                    className="form-label"
                                >
                                    recommend
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={submitReview}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <br />
        </>
    );
}

export default Create;
