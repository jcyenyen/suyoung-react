import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./styles/act.scss";
import { useBackground } from "../../utils/useBackground";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { ACT_GET_LIST } from "./config/ajax-path";
import { Link } from "react-router-dom";
import { useActBookingList } from "../../utils/useActBookingList";
import { useAuth } from "../Login/sub-pages/AuthProvider";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Swal from "sweetalert2";

function Upstream(props) {
    // //BG設定
    const { setBackground } = useBackground();
    // //輪播牆設定
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    // //所有act列表
    const [act, setAct] = useState([]);

    //keep hook====================================
    const [memberKeep, setMemberKeep] = useState({
        // favlistId: "",
        // memberId: "",
        favType: 2,
    });

    const [favlist, setFavlist] = useState([]);

    const favlistId = 3;

    const deleteKeep = () => {
        Axios.delete(
            `http://localhost:3700/member/favlist/act/delete?memberId=${auth.m_id}&favlistId=${favlistId}`
        ).then((res) => {
            // console.log(res);
            setFavlist([]);
            setMemberKeep({
                // favlistId: "",
                // memberId: "",
                favType: 2,
            });
            getFav();
        });
    };

    const getFav = () => {
        Axios.get(
            `http://localhost:3700/member/act/favlist/?memberId=${auth.m_id}&actSid=${favlistId}`
        ).then((res) => {
            // console.log(res.data.resultFav);
            setFavlist([...res.data.resultFav]);
        });
    };

    const postData = () => {
        Axios.post(`http://localhost:3700/member/favlist/act`, memberKeep).then(
            (res) => {
                // console.log(res);
                getFav();
            }
        );
    };

    useEffect(() => {
        // if (memberKeep.memberId !== "" && memberKeep.favlistId !== "") {
        // console.log({ memberKeep });
        if (!!memberKeep.memberId && !!memberKeep.favlistId) {
            // console.log("postData!");
            postData();
        }
    }, [memberKeep]);

    //keep end======================================================

    // // useContext
    const { actBookingList, setActBookingList } = useActBookingList();
    const { setAuth, ...auth } = useAuth();

    // 先把localStorage 的資料存進 localRoom 裡
    useEffect(() => {
        if (auth.authorized) {
            setActBookingList({ ...actBookingList, memberId: auth.m_id });
        }
    }, []);

    // 從 actbookingList解構
    const { actSid } = actBookingList;

    // // 用get 取得所有的值
    const getData = async () => {
        await Axios.get(`${ACT_GET_LIST}/selectAct?actSid=${actSid}`).then(
            (response) => {
                setAct(response.data.actUpstream);
                // const newAct = response.data.actUpstream[0];
                // setActBookingList({...newAct});
                // console.log(response.data.actUpstream);
            }
        );
    };

    // 起始狀態先render getData
    useEffect(() => {
        localStorage.removeItem("Act");
        getData();
        getFav();
    }, []);

    //背景設定
    useEffect(() => {
        setBackground("bg1.svg");
    }, []);
    useEffect(() => {
        //若是didmount時沒資料就跳出
        if (!act.length) return;

        let groups = gsap.utils.toArray(".actGroup");
        let toggles = gsap.utils.toArray(".actToggle");
        let listToggles = groups.map(createAnimation);

        toggles.forEach((toggle) => {
            toggle.addEventListener("click", function () {
                toggleMenu(toggle);
            });
        });

        function toggleMenu(clickedToggle) {
            listToggles.forEach((toggleFn) => toggleFn(clickedToggle));
        }
        function createAnimation(element) {
            let menu = element.querySelector(".actToggle");
            let box = element.querySelector(".actDetail");

            gsap.set(box, { height: "auto" });
            let animation = gsap
                .from(box, {
                    height: 0,
                    duration: 0.5,
                    ease: "power1.inOut",
                })
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }
        //等資料帶進來後執行
    }, [act]);

    if (act.length === 0) return <></>;

    return (
        <>
            <section>
                <div className="emf">
                    <div className="card_bg">
                        <div className="keep_button like">
                            {auth.authorized ? (
                                <input
                                    className="checkbox-tools"
                                    type="checkbox"
                                    name="keep"
                                    id="keepBtn"
                                    value={favlistId}
                                    checked={favlist.length}
                                    onChange={(e) => {
                                        if (favlist.length !== 0) {
                                            deleteKeep();
                                            Swal.fire({
                                                imageUrl:
                                                    "/member_img/logo.svg",
                                                confirmButtonColor: "#224040",
                                                color: "#224040",
                                                text: "已移除收藏",
                                            });
                                        } else {
                                            setMemberKeep({
                                                ...memberKeep,
                                                memberId: auth.m_id,
                                                favlistId: 3,
                                            });
                                            Swal.fire({
                                                imageUrl:
                                                    "/member_img/logo.svg",
                                                confirmButtonColor: "#224040",
                                                color: "#224040",
                                                text: "已加入收藏",
                                            });
                                        }
                                    }}
                                />
                            ) : (
                                <input
                                    className="checkbox-tools"
                                    type="checkbox"
                                    name="keep"
                                    id="keepBtn"
                                    value={favlistId}
                                    onClick={() => {
                                        Swal.fire({
                                            icon: "error",
                                            title: "未登入會員",
                                            text: "請先登入會員",
                                            color: "#224040",
                                            background: "#fff",
                                            confirmButtonColor: "#224040",
                                        });
                                    }}
                                />
                            )}

                            <label
                                className="for-checkbox-tools"
                                htmlFor="keepBtn"
                            >
                                {favlist.length !== 0 ? (
                                    <AiFillHeart className="fillHeart" />
                                ) : (
                                    <AiOutlineHeart className="outlineHeart" />
                                )}
                            </label>
                        </div>
                        <div className="d-flex align-items-center titleGroup">
                            <div className="actEnTitle">
                                <h3>Upstream</h3>
                            </div>
                            <div className="actChTitle">
                                <h4>{act[0].act_name}</h4>
                            </div>

                            <Link to="/shuyoung/act/actreservation">
                                <button
                                    className="btn btn-dark"
                                    onClick={() => {
                                        setActBookingList({...actBookingList,
                                            actSid: act[0].act_id,
                                            Maxpeople: act[0].max_people,
                                            price: act[0].act_price,
                                            actName: act[0].act_name,
                                            people: 1,
                                            actImg: act[0].filename,
                                            });
                                    }}
                                >
                                    預約報名
                                </button>
                            </Link>
                        </div>
                        <div className="actContentRow d-flex">
                            <div className="slider">
                                <Swiper
                                    style={{
                                        "--swiper-navigation-color": "#fff",
                                        "--swiper-pagination-color": "#fff",
                                    }}
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    {act.map((av, ai) => {
                                        return (
                                            <SwiperSlide key={ai}>
                                                <img
                                                    src={
                                                        "/act_imgs/" +
                                                        av.filename
                                                    }
                                                    alt=""
                                                />
                                            </SwiperSlide>
                                        );
                                    })}
                                    ;
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={10}
                                    slidesPerView={5}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper"
                                >
                                    {act.map((av, ai) => {
                                        return (
                                            <SwiperSlide key={ai}>
                                                <img
                                                    src={
                                                        "/act_imgs/" +
                                                        av.filename
                                                    }
                                                    alt=""
                                                />
                                            </SwiperSlide>
                                        );
                                    })}
                                    ;
                                </Swiper>
                            </div>
                            <div className="actContentCotainer">
                                <motion.div
                                    className="actGroup"
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.5,
                                        default: { ease: "linear" },
                                    }}
                                >
                                    <div className="actToggle">
                                        <div className="actTitle">
                                            <div className="top">
                                                <h5>
                                                    <i className="fa-solid fa-person-hiking mr-2" />
                                                    活動介紹
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="actC">
                                        <div className="actDetail">
                                            <div className="textspace">
                                                {act[0].act_desc}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="actGroup"
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.5,
                                        default: { ease: "linear" },
                                    }}
                                >
                                    <div className="actToggle">
                                        <div className="actTitle">
                                            <div className="top">
                                                <h5>
                                                    <i className="fas fa-comment-dollar mr-2"></i>
                                                    活動收費
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="actC">
                                        <div className="actDetail">
                                            <div className="textspace">
                                                每人 {act[0].act_price}
                                                元，行程約 3 小時，歡迎 5~65
                                                歲的大小朋友預約報名唷！
                                                <br />
                                                活動費用含專業帶團教練
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="actGroup"
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.5,
                                        default: { ease: "linear" },
                                    }}
                                >
                                    <div className="actToggle">
                                        <div className="actTitle">
                                            <div className="top">
                                                <h5>
                                                    <i className="fas fa-calendar-check mr-2"></i>
                                                    活動行程
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="actC">
                                        <div className="actDetail">
                                            <div className="textspace">
                                                {act[0].act_schedule}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="actGroup"
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.5,
                                        default: { ease: "linear" },
                                    }}
                                >
                                    <div className="actToggle">
                                        <div className="actTitle">
                                            <div className="top">
                                                <h5>
                                                    <i className="fas fa-binoculars mr-2" />
                                                    個人準備物品
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="actC">
                                        <div className="actDetail">
                                            <div className="textspace">
                                                {act[0].act_prepare}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="actGroup"
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.5,
                                        default: { ease: "linear" },
                                    }}
                                >
                                    <div className="actToggle">
                                        <div className="actTitle">
                                            <div className="top">
                                                <h5>
                                                    <i className="fa-solid fa-circle-exclamation mr-2" />
                                                    注意事項
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="actC">
                                        <div className="actDetail">
                                            <div className="textspace">
                                                {act[0].act_notice}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Upstream;
