import React, { useState, useEffect } from "react";
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
    const [UpdateRoomList, setUpdateRoomList] = useState([]);

    // 用get 取得所有的值
    const getData = (roomID) => {
        Axios.get(`http://localhost:3700/booking/selected${roomID}`).then(
            (response) => {
                setUpdateRoomList(response.data);
                console.log(response.data);
                console.log(props.roomID);
            }
        );
    };
    const { roomID } = props;
    //用 post 回傳後面的object 給 node 後端
    const updateReview = () => {
        Axios.put(
            `http://localhost:3700/booking/update${roomID}/${UpdateRoomList.room_type_id}`,
            roomState
        )
            .then(() => {
                props.setRoomList([...UpdateRoomList, { roomState }]);
            })
            .catch((err) => {
                alert("err:", err);
            });
    };

    const {
        room_type,
        sid,
        room_name,
        room_price,
        room_type_id,
        person_num,
        room_image,
        recommend,
    } = UpdateRoomList;

    // 將取到的值呈現出來 componentDidMount()
    useEffect(() => {
        getData(props.roomID);
    }, []);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h3>Update room</h3>
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
                                    placeholder={room_type}
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
                                    placeholder={room_name}
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
                                    placeholder={room_price}
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
                                    placeholder={person_num}
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
                                    placeholder={room_image}
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
                                    checked={recommend === 1 ? "checked" : null}
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
                                onClick={updateReview}
                            >
                                Update
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
