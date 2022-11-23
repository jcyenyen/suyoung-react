import React, { useState } from "react";
import Crud from "./sub-pages/Crud";
import Create from "./sub-pages/Create";
import Update from "./sub-pages/Update";

function Index(props) {
    const [step, setStep] = useState(null);
    const [roomID, setRoomID] = useState("");
    const [roomList, setRoomList] = useState("");

    // 動態元件語法
    const components = [Create, Update];
    const BlockComponent = components[step];

    return (
        <>
            <h1>Booking</h1>
            <Crud
                step={step}
                setStep={setStep}
                setRoomID={setRoomID}
                roomList={roomList}
            />

            <div className="show-table">
                {step != null ? (
                    <BlockComponent
                        step={step}
                        roomID={roomID}
                        setRoomList={setRoomList}
                    />
                ) : null}
            </div>
        </>
    );
}

export default Index;
