import React from "react";
import { useBookingList } from "../../../utils/useBookingList";
import { Link } from "react-router-dom";

function MapBeauty(props) {
    const { bookingList, setBookingList } = useBookingList();

    return (
        <>
            <div className="popup_window">
                <div className="window_des">
                    <div className="des_picture_wangmei1">
                        <img
                            src="http://localhost:3777/map_imgs/wangmei1.png"
                            alt=""
                        />
                    </div>
                    <div>
                        <br />
                        <h5>頂級星空帳</h5>
                        <br />
                        <div className="des_content_wangmei">
                            <p>
                                舒營的頂級星空帳室內空間呈半圓形，白天可通過透明布幕看到外面風景，晚上則可以通過上方的開合式布簾一窺美麗星空。房內設有柔軟大沙發及歐洲進口KingSize雙人床，讓您體驗浪漫的一天。
                            </p>
                            <br />
                            <Link to="/shuyoung/Booking">
                                <button
                                    className="seemore_map_booking"
                                    onClick={() => {
                                        setBookingList({
                                            ...bookingList,
                                            roomSelector: ["1"],
                                        });
                                    }}
                                >
                                    點擊前往訂房
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="window_des">
                    <div className="des_picture_wangmei2">
                        <img
                            src="http://localhost:3777/map_imgs/wangmei2.png"
                            alt=""
                        />
                    </div>
                    <div>
                        <br />
                        <h5>印第安帳</h5>
                        <br />
                        <div className="des_content_wangmei">
                            <p>
                                舒營的印第安帳室內空間為上窄下寬，佈置為美洲原始風，屋內中間設有定時定溫電子加熱火爐，可讓您和您的朋友體驗棚內圍爐的樂趣，床鋪為多張柔軟高級彈簧床，為您的睡眠品質把關。
                            </p>
                            <br />
                            <Link to="/shuyoung/Booking">
                                <button
                                    className="seemore_map_booking"
                                    onClick={() => {
                                        setBookingList({
                                            ...bookingList,
                                            roomSelector: ["2"],
                                        });
                                    }}
                                >
                                    點擊前往訂房
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="window_des">
                    <div className="des_picture_wangmei3">
                        <img
                            src="http://localhost:3777/map_imgs/wangmei3.png"
                            alt=""
                        />
                    </div>
                    <div>
                        <br />
                        <h5>網美神殿帳</h5>
                        <br />
                        <div className="des_content_wangmei">
                            <p>
                                舒營的網美神殿帳為室內空間最大的選擇，適合親朋好友一同來同歡享受，房內有多張高級彈簧床以及懶人骨頭沙發，讓您能隨處躺隨處放鬆，此外棚內也有古董家具佈景，讓您的美照有更多的變化。
                            </p>
                            <br />
                            <Link to="/shuyoung/Booking">
                                <button
                                    className="seemore_map_booking"
                                    onClick={() => {
                                        setBookingList({
                                            ...bookingList,
                                            roomSelector: ["3"],
                                        });
                                    }}
                                >
                                    點擊前往訂房
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <button
                    className="popup_exit_btn"
                    onClick={() => {
                        window.location.href =
                            "http://localhost:3777/shuyoung/SuMap";
                    }}
                >
                    X
                </button>
                {/*  */}
            </div>
        </>
    );
}

export default MapBeauty;
