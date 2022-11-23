import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useBookingList } from "../../../../../utils/useBookingList";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper";

function RoomCard(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { roomList, tagList, picList } = props;

    if (roomList.length === 0 || tagList.length === 0 || picList.length === 0)
        return <></>;

    return (
        <>
            <div className="room_Card">
                <div className="room_pic">
                    <div className="swiper_container">
                        <Swiper
                            style={{
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-color": "#fff",
                            }}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                        >
                            {picList.map((pv, pi) => {
                                return (
                                    <SwiperSlide key={pi}>
                                        <img
                                            src={
                                                "/room_imgs/" +
                                                pv.room_folder +
                                                "/" +
                                                pv.pic_name
                                            }
                                            alt=""
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            watchSlidesProgress={true}
                            modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                        >
                            {picList.map((pv, pi) => {
                                return (
                                    <SwiperSlide key={pi}>
                                        <img
                                            src={
                                                "/room_imgs/" +
                                                pv.room_folder +
                                                "/" +
                                                pv.pic_name
                                            }
                                            alt=""
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
                <div className="room_content">
                    <div className="room_card_title">
                        <h3>{roomList[0].room_name}</h3>
                    </div>
                    <div className="room_card_subtitle">
                        <h4>
                            {roomList[0].person_num}人房{" "}
                            {roomList[0].person_num / 2}
                            張雙人床
                        </h4>
                    </div>

                    <div className="room_card_tag">
                        {tagList.map((t, ti) => {
                            return (
                                <div className="room_card_tag_btn" key={ti}>
                                    <span className="text">{t.type}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="room_card_paragraph">
                        {roomList[0].description}
                    </div>
                    <div className="room_card_Price">
                        <p>TWD:</p>
                        <h4>{roomList[0].room_price}</h4>
                        <p>晚</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomCard;
