import React, { useState } from "react";
import { formatInTimeZone } from 'date-fns-tz';
import { DateRangePicker, InputNumber, InputGroup } from "rsuite";
import { useBookingList } from "../../../utils/useBookingList";
import useRWD from "../../../utils/useRWD";
const { allowedMaxDays, beforeToday, combine } = DateRangePicker;

function BookingArea(props) {
    const {kidsValue, setKidsValue, adultValue, setAdultValue, datePicker, setDatePicer} = props;
    const { bookingList, setBookingList } = useBookingList();
    // const [datePicker, setDatePicer] = useState({
    //     startDate: "",
    //     endDate: "",
    //     perNight: "",
    //     nextDate:"",
    // });
    const [personCount, setPersonCount] = useState({
        adults: "",
        kids: "",
    });
    // const [adultValue, setAdultValue] = useState(0);
    // const [kidsValue, setKidsValue] = useState(0);
    const [isActive,setIsActive] = useState(false);

    const device = useRWD();

    // 轉換日期格式
    const formatDate = (date) => {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    };

    const dateRangePickHandler = (v) => {
        if(v){
            // 創造一個新的日期
            // 切勿直接用 nextDate = v[0]; 會改變v[0]的值
            const nextDate = new Date(v[0]);
            // 日期＋1
            nextDate.setDate(nextDate.getDate()+1);
            // 轉換格式
            const v2 = formatInTimeZone(nextDate, 'Asia/Taipei', 'yyyy-MM-dd');
            setBookingList({
            ...bookingList,
            startDate: formatDate(v[0].toDateString()),
            endDate: formatDate(v[1].toDateString()),
            nextDate: v2,
            perNight: (v[1] - v[0]) / 86400000,
        });
        setDatePicer({
            ...datePicker,
            startDate:formatDate(v[0].toDateString()),
            endDate: formatDate(v[1].toDateString()),
            perNight: (v[1] - v[0]) / 86400000,
            nextDate: v2,
        });
        setIsActive(true);
        }else{
            setBookingList({
            ...bookingList,
            startDate: "",
            endDate: "",
            perNight:"",
            nextDate:"",
        });
        setDatePicer({
            ...datePicker,
            startDate: "",
            endDate: "",
            perNight: "",
            nextDate: "",
        });
        setIsActive(false);
        }
    }

    // 計算人數增加減少 A for Adults K for kids
    const handleMinusA = () => {
        if (adultValue > 0) {
            setAdultValue(parseInt(adultValue, 10) - 1);
            setPersonCount({
                ...personCount,
                adults: parseInt(adultValue, 10) - 1,
            });
            setBookingList({
                ...bookingList,
                adults: parseInt(adultValue, 10) - 1,
            });
        }
    };
    const handleMinusK = () => {
        if (kidsValue > 0) {
            setKidsValue(parseInt(kidsValue, 10) - 1);
            setPersonCount({
                ...personCount,
                kids: parseInt(kidsValue, 10) - 1,
            });
            setBookingList({
                ...bookingList,
                kids: parseInt(kidsValue, 10) - 1,
            });
        }
    };
    const handlePlusA = () => {
        if (adultValue < 8) {
            setAdultValue(parseInt(adultValue, 10) + 1);
            setPersonCount({
                ...personCount,
                adults: parseInt(adultValue, 10) + 1,
            });
            setBookingList({
                ...bookingList,
                adults: parseInt(adultValue, 10) + 1,
            });
        }
    };
    const handlePlusK = () => {
        if (kidsValue < 4) {
            setKidsValue(parseInt(kidsValue, 10) + 1);
            setPersonCount({
                ...personCount,
                kids: parseInt(kidsValue, 10) + 1,
            });
            setBookingList({
                ...bookingList,
                kids: parseInt(kidsValue, 10) + 1,
            });
        }
    };

    return (
        <>
            <div className="booking_area">
                <div className="dateRangePicker">
                {device === "mobile" ? (<DateRangePicker
                        block
                        showOneCalendar
                        placeholder={"請輸入入住與退房日期"}
                        disabledDate={combine(allowedMaxDays(7), beforeToday())}
                        onChange={(v) => {
                            dateRangePickHandler(v);
                        }}
                    />) : (<DateRangePicker
                        placeholder={"請輸入入住與退房日期"}
                        disabledDate={combine(allowedMaxDays(7), beforeToday())}
                        onChange={(v) => {
                            dateRangePickHandler(v);
                        }}
                    />)}
                    
                </div>
                <div className="booking_result_date">
                    {isActive ? (
                        <p>
                            共 <span>{datePicker.perNight}</span> 晚
                        </p>
                    ):null}
                    <div className="booking_result_datePicer">
                        <p>
                            入住日期: <span>{datePicker.startDate}</span>
                        </p>
                        <p>
                            退房日期: <span>{datePicker.endDate}</span>
                        </p>
                    </div>
                </div>
                <div className="booking_person_area">
                    <div className="booking_person">
                        <label>成人</label>
                        <InputGroup>
                            <InputGroup.Button onClick={handleMinusA}>
                                -
                            </InputGroup.Button>
                            <InputNumber
                                className={"custom-input-number"}
                                value={adultValue}
                                onChange={setAdultValue}
                            />
                            <InputGroup.Button onClick={handlePlusA}>
                                +
                            </InputGroup.Button>
                        </InputGroup>
                    </div>
                    <div className="booking_person">
                        <label>小孩</label>
                        <InputGroup>
                            <InputGroup.Button onClick={handleMinusK}>
                                -
                            </InputGroup.Button>
                            <InputNumber
                                className={"custom-input-number"}
                                value={kidsValue}
                                onChange={setKidsValue}
                            />
                            <InputGroup.Button onClick={handlePlusK}>
                                +
                            </InputGroup.Button>
                        </InputGroup>
                    </div>
                </div>
                <div className="booking_result">
                    <div className="booking_result_PersonNum">
                        <p>
                            <span>{personCount.adults}</span> 位成人 |{" "}
                            <span>{personCount.kids}</span> 位小孩
                        </p>
                        <p>每加一位小孩需付人頭費(NT.200)</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingArea;
