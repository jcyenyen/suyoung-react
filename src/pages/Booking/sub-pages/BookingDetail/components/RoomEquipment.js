import React from "react";
import useRWD from "../../../../../utils/useRWD";
function RoomEquipment(props) {
    const { eqiList } = props;
    const device = useRWD();

    return (
        <>
            <div className="room_equipment">
                <div className="room_equipment_title">
                    <h5>房內設施</h5>
                </div>
                <div className="room_equipment_box">
                    {eqiList.map((v, i) => {
                        if(device ==="PC"){
                            return (
                                <div className="room_equipment_btn" key={i}>
                                    <span>{v.equipment}</span>
                                </div>
                            );
                        }else {
                            if (i >= 8) {
                                return (<></>)
                            }else{
                                return (
                                    <div className="room_equipment_btn" key={i}>
                                        <span>{v.equipment}</span>
                                    </div>
                                );
                            }
                        }
                            
                    })}
                    {/* {device === "mobile" && eqiList.map((v, i) => {
                            if (i >= 8) {
                                return (<></>)
                            }else{
                                return (
                                    <div className="room_equipment_btn" key={i}>
                                        <span>{v.equipment}</span>
                                    </div>
                                );
                            }
                    })} */}
                </div>
            </div>
        </>
    );
}

export default RoomEquipment;
