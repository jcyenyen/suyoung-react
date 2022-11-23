import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./styles/act.scss";
import { useBackground } from "../../utils/useBackground";
import { AutoComplete } from "rsuite";
import {
    Calendar,
    Whisper,
    Checkbox,
    Input,
    Tooltip,
    DatePicker,
    InputNumber,
    InputGroup,
} from "rsuite";
import { useActBookingList } from "../../utils/useActBookingList";
import Swal from "sweetalert2";
import { useAuth } from "../Login/sub-pages/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ACT_GET_LIST } from "./config/ajax-path";
import { motion } from "framer-motion";
import isBefore from "date-fns/isBefore";
import { date } from "yup";
import { Value } from "sass";

function ActReser(props) {
    //活動資料存放處
    const { actBookingList, setActBookingList } = useActBookingList();
    //控制背景圖
    const { setBackground } = useBackground();
    useEffect(() => {
        setBackground("bg1.svg");
    }, []);
    const { setAuth, ...auth } = useAuth();
    const navigate = useNavigate();
    //didUpdate.log
    // console.log(actBookingList);

    //日期格式調整
    const formatDate = (date) => {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    };
    const today = new Date();

    //信箱提示data
    const suffixes = [
        "@gmail.com",
        "@yahoo.com.tw",
        "@hotmail.com",
        "@outlook.com",
    ];
    const [emailData, setEmailData] = useState([]);
    const [value, setValue] = useState(0);
    const [vArray, setVArray] = useState([]);
    const [agreeMent, setAgreeMent] = useState(false);
    const [contact, setContact] = useState([]);
    const [datePick, setDatePick] = useState();
    const [rsName, setRsName] = useState("")
    const [rsPhone, setRsPhone] = useState("")
    // console.log("people:", value);
    // console.log("totalPrice:", actBookingList.totalPrice);
    const [actCount, setActCount] = useState(0);

    useEffect(() => {
        if (value >= 1) {
            const total = actBookingList.price * value;
            setActBookingList({ ...actBookingList, totalPrice: total });
        }
    }, [value]);

    const handleMinus = () => {
        const newValue = parseInt(value, 10) - 1;
        setValue(newValue);
        const oldvArray = vArray;
        const newvArray = oldvArray.filter((v) => v !== value);
        setVArray(newvArray);
        setActBookingList({
            ...actBookingList,
            people: parseInt(value, 10) - 1,
        });
        setContact(parseInt(value, 10) - 1);
    };
    const handlePlus = () => {
        const newValue = parseInt(value, 10) + 1;
        setValue(newValue);
        setVArray([...vArray, newValue]);
        setActBookingList({
            ...actBookingList,
            people: parseInt(value, 10) + 1,
        });
        setContact(parseInt(value, 10) + 1);
    };
    const handleCheck = (value, checked) => {
        setAgreeMent(checked);
    };

    // console.log(agreeMent);
    const handleChange = (value) => {
        const at = value.match(/@[\S]*/);
        const nextData = at
            ? suffixes
                  .filter((item) => item.indexOf(at[0]) >= 0)
                  .map((item) => {
                      return `${value}${item.replace(at[0], "")}`;
                  })
            : suffixes.map((item) => `${value}${item}`);

        setEmailData(nextData);
    };

    const postRoomData = async () => {
        await Axios.post(`${ACT_GET_LIST}/act_order`, actBookingList);
    };

    useEffect(() => {
        localStorage.setItem("Act", JSON.stringify([actBookingList]));
    }, [actBookingList]);

    useEffect(() => {
        setActBookingList({...actBookingList,actCount:actCount});
    }, [actCount]);

    // const data = [actBookingList.price]
    return (
        <>
            <section>
                <div className="emf">
                    <div className="card_bg">
                        <motion.div
                            className="keep-card"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.5,

                                default: { ease: "linear" },
                            }}
                        >
                            <div className="actEnTitle titleGroup">
                                <h3>{actBookingList.actName || actBookingList.act_name}</h3>
                                <h4>預約報名</h4>
                            </div>
                        </motion.div>
                        <div className="d-flex calendar">
                            <motion.div
                                className="keep-card"
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.5,
                                    default: { ease: "linear" },
                                }}
                            >
                                <div className="calendarLeft">
                                    <Calendar
                                        value={datePick}
                                        onChange={(v) => {
                                            if (v) {
                                                setDatePick(v);
                                                setActBookingList({
                                                    ...actBookingList,
                                                    date: formatDate(v),
                                                });
                                            }
                                        }}
                                    />
                                </div>
                            </motion.div>
                            <motion.div
                                className="keep-card"
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.7,
                                    default: { ease: "linear" },
                                }}
                            >
                                <div className="calendarRight">
                                    <div className="actOrder">
                                        <h4>預約內容</h4>
                                        <div className="orderItem">
                                            <label
                                                htmlFor="actDate"
                                                className="actlabel"
                                            >
                                                ＊活動日期
                                            </label>
                                            <DatePicker
                                                placeholder="請選擇活動日期"
                                                value={datePick}
                                                disabledDate={(date) =>
                                                    isBefore(date, new Date())
                                                }
                                                locale={{
                                                    sunday: "日",
                                                    monday: "一",
                                                    tuesday: "二",
                                                    wednesday: "三",
                                                    thursday: "四",
                                                    friday: "五",
                                                    saturday: "六",
                                                    ok: "确定",
                                                    today: "今天",
                                                    yesterday: "昨天",
                                                    hours: "时",
                                                    minutes: "分",
                                                    seconds: "秒",
                                                }}
                                                onChange={(v) => {
                                                    // console.log(v);
                                                    if (v) {
                                                        setActBookingList({
                                                            ...actBookingList,
                                                            date: formatDate(v),
                                                        });
                                                        setDatePick(v);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="orderItem">
                                            <label
                                                htmlFor="actPeople"
                                                className="actlabel"
                                            >
                                                ＊報名人數
                                            </label>
                                            <InputGroup>
                                                <InputGroup.Button
                                                    onClick={handleMinus}
                                                >
                                                    -
                                                </InputGroup.Button>
                                                <InputNumber
                                                    className={
                                                        "custom-input-number"
                                                    }
                                                    value={value}
                                                    onChange={setValue}
                                                />
                                                <InputGroup.Button
                                                    onClick={handlePlus}
                                                >
                                                    +
                                                </InputGroup.Button>
                                            </InputGroup>
                                        </div>
                                        <div className="orderItem">
                                            <label
                                                htmlFor="actPrice"
                                                className="actlabel"
                                            >
                                                活動費用
                                            </label>
                                            <input
                                                className="disableinput"
                                                type="text"
                                                disabled
                                                value={actBookingList.price}
                                            />
                                        </div>
                                        <div className="orderItem">
                                            <label
                                                htmlFor="actTotal"
                                                className="actlabel"
                                            >
                                                總共費用
                                            </label>
                                            <input
                                                className="disableinput"
                                                type="text"
                                                disabled
                                                value={
                                                    actBookingList.totalPrice
                                                }
                                            />
                                        </div>
                                        <div className="orderItem">
                                            {/* <button
                                                className="btn btn-dark"
                                                onClick={() => {
                                                    setActBookingList({
                                                        ...actBookingList,
                                                        actSid: "",
                                                        actName: "",
                                                        people: "",
                                                        Maxpeople: "",
                                                        date: "",
                                                        price: "",
                                                        totalPrice: "",
                                                        memberId: "",
                                                        orderType: "2",
                                                    });
                                                    localStorage.removeItem(
                                                        "Act"
                                                    );
                                                    navigate(-1);
                                                }}
                                            >
                                                取消預約
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="actRsTitle" onClick={()=>{
                            setRsName("舒小營")
                            setRsPhone("0988468038")
                        }}>
                            <h4>聯絡人資訊</h4>
                        </div>
                        <form action="" method="post">
                            <div className="d-flex justify-content-around actForm">
                                <div>
                                    <label
                                        htmlFor="actCotactName"
                                        className="actlabel"
                                    >
                                        ＊姓名
                                    </label>
                                    <Whisper
                                        trigger="focus"
                                        speaker={<Tooltip>必填</Tooltip>}
                                    >
                                        <Input placeholder="請填入姓名" value={rsName}/>
                                    </Whisper>
                                </div>
                                <div>
                                    <label
                                        htmlFor="actName"
                                        className="actlabel"
                                    >
                                        ＊手機號碼
                                    </label>
                                    <Whisper
                                        trigger="focus"
                                        speaker={<Tooltip>必填</Tooltip>}
                                    >
                                        <Input placeholder="請填入手機號碼" value={rsPhone}/>
                                    </Whisper>
                                </div>
                                <div>
                                    <label
                                        htmlFor="actName"
                                        className="actlabel"
                                    >
                                        電子郵件
                                    </label>
                                    {/* <input type="text" id="actName" className="actText"/> */}
                                    <AutoComplete
                                        data={emailData}
                                        placeholder="Email"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="actRsTitle">
                                <h4>參與人資料</h4>
                            </div>
                            {vArray.map((v, i) => {
                                return (
                                    <div
                                        className="d-flex justify-content-around actForm"
                                        key={i}
                                    >
                                        <div>
                                            <label
                                                htmlFor="actName"
                                                className="actlabel"
                                            >
                                                姓名
                                            </label>
                                            <input
                                                type="text"
                                                id="actName"
                                                className="actText"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="actBd"
                                                className="actlabel"
                                            >
                                                出生年月日
                                            </label>
                                            <input
                                                type="text"
                                                id="actBd"
                                                className="actText"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="idNum"
                                                className="actlabel"
                                            >
                                                身分證字號
                                            </label>
                                            <input
                                                type="text"
                                                id="idNum"
                                                className="actText"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </form>
                        <div className="actRsTitle">
                            <h4>務必閱讀：報名前注意事項</h4>
                        </div>
                        <div className="precautions">
                            <div>
                                <h5>退費政策</h5>
                                a.
                                若遇颱風等天候不可抗力之因素無法出團，團員可選擇扣除行政兼保險費用
                                50 元/人後退款，或保留改期。
                                <br />
                                b. 個人因素改期、更換團員，不收任何費用，請於 7
                                日前通知，7 日內不受理變更。
                                <br />
                                c. 個人因素取消退費，活動 7 天前通知退費 90%，7
                                天內取消行程不予退費。
                                <br />
                            </div>
                            <div>
                                <h5>集合時間</h5>
                                a.
                                報名場次時間即為集合時間，參與活動請務必準時，當天若遲到逾時
                                20 分 鐘，恕無法參與活動整體活動行程約 3
                                小時，含換裝、盥洗溯溪時間約 2
                                小時，並全程由帥氣教練帶領。
                            </div>
                            <div>
                                <h5>安全守則</h5>
                                本活動為戶外活動，年齡限制為 5~65
                                歲，如因疾病或身體狀況不適而不宜參加者，請事先聲明。
                                <br />
                                參加活動時，依規定全程穿著救生衣及必要之安全配備，且遵守安全規則，確保團隊及自身安全。
                                <br />
                                期間配合活動流程，以活動團隊規劃區域為活動範圍，不單獨行動，並注意自身安全。
                                <br />
                                禁止從事任何危險之遊戲。
                                <br />
                                活動期間，學員之貴重物品，如：手機、電子產品及零用錢等各項私人物品，請交由活動團隊保管；如需自行保管，請自負責任。
                                <br />
                                若欲提前離開，需向教練反應，切勿私自脫團。
                                <br />
                                若遇不可抗拒之情況，如天氣狀況不佳或自然環境之變動，本團隊保留取消或變更行程之權利。
                                <br />
                                教練將盡一切最大能力維護參加者的安全，但若參加者仍因個人疏失導致傷亡（如閃神失足、跌倒、滑倒、自行脫隊、隱瞞身體狀況問題等等），不可究責於本團隊。
                                <br />
                                安全第一，活動全程請務必遵守教練指示，如有不便，敬請見諒。
                                須同意以上切結事項，方可報名，感謝您。
                            </div>
                            <div className="agreeBtn">
                            <div>
                                    <Checkbox
                                        value={value}
                                        onChange={handleCheck}
                                    >
                                        我已閱讀並同意以上切結事項
                                    </Checkbox>
                                </div>
                                <button
                                    className="btn btn-dark"
                                    onClick={() => {
                                        //檢查會員是否登入
                                        if (auth.authorized) {
                                            //檢查日期與人數參與人是否有選擇與填入
                                            if (
                                                // actBookingList.contactName &&
                                                actBookingList.date &&
                                                actBookingList.people
                                            ) {
                                                //檢查是否勾選同意書
                                                if (agreeMent) {
                                                    localStorage.setItem(
                                                        "Act",
                                                        JSON.stringify([
                                                            actBookingList,
                                                        ])
                                                    );
                                                    //成功畫面
                                                    Swal.fire({
                                                        icon: "success",
                                                        title: "已加入購物車",
                                                        text: "請盡快完成結帳",
                                                        showConfirmButton: false,
                                                        timer: 1500,
                                                    }).then(() => {
                                                        postRoomData();
                                                        setActCount(actCount+1);
                                                    });
                                                } else {
                                                    Swal.fire({
                                                        icon: "error",
                                                        title: "尚未勾選",
                                                        text: "請勾選同意書",
                                                        color: "#224040",
                                                        background: "#FFF",
                                                        confirmButtonColor:
                                                            "#224040",
                                                    });
                                                }
                                            } else {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "輸入資料有誤",
                                                    text: "請選擇活動日期及報名人數",
                                                    color: "#224040",
                                                    background: "#FFF",
                                                    confirmButtonColor:
                                                        "#224040",
                                                });
                                            }
                                        } else {
                                            Swal.fire({
                                                icon: "error",
                                                title: "未登入會員",
                                                text: "請先登入會員",
                                                color: "#224040",
                                                background: "#fff",
                                                showConfirmButton: true,
                                                confirmButtonColor: "#224040",
                                                confirmButtonText: `登入會員`,
                                                showDenyButton: true,
                                                denyButtonText: `取消`,
                                                denyButtonColor: "#c1a688",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    navigate(
                                                        "/shuyoung/loging"
                                                    );
                                                } else if (result.isDenied) {
                                                    navigate(-1);
                                                }
                                            });
                                            setActBookingList({
                                                ...actBookingList,
                                                actSid: "",
                                                actName: "",
                                                people: "",
                                                Maxpeople: "",
                                                date: "",
                                                price: "",
                                                totalPrice: "",
                                                memberId: "",
                                                orderType: "2",
                                            });
                                            localStorage.removeItem("Act");
                                        }
                                    }}
                                >
                                    預約報名
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ActReser;
