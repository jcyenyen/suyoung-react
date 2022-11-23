import React, { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useRWD from "../../../../../utils/useRWD";

function DetailPictures(props) {
    const { picList } = props;

    const device = useRWD();

    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        if (picList.length === 0) return;
        let textMoveX = 700;
        let imgMoveX = 500;
        if(device === "PC"){
            textMoveX = 700;
            imgMoveX = 500;
            // console.log("PC");
            // console.log(textMoveX,imgMoveX);
        }else if (device === "tablet"){
            textMoveX = 500;
            imgMoveX = 500;
            // console.log("tablet");
            // console.log(textMoveX,imgMoveX);
        }else if ( device ==="mobile"){
            textMoveX = 100;
            imgMoveX = 100;
            // console.log("mobile");
            // console.log(textMoveX,imgMoveX);
        }

        for (let i = 1; i <= 5; i += 2) {
            gsap.to(`.filled-text${i}, .outline-text${i}`, {
                scrollTrigger: {
                    trigger: `.filled-text${i}, .outline-text${i}`,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                x: textMoveX,
            });

            gsap.to(`.image${i}`, {
                scrollTrigger: {
                    trigger: `.image${i}`,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                x: -imgMoveX,
            });
        }
        for (let i = 2; i <= 6; i += 2) {
            gsap.to(`.filled-text${i}, .outline-text${i}`, {
                scrollTrigger: {
                    trigger: `.filled-text${i}, .outline-text${i}`,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                x: -textMoveX,
            });

            gsap.to(`.image${i}`, {
                scrollTrigger: {
                    trigger: `.image${i}`,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                x: imgMoveX,
            });
        }
    }, [picList,device]);

    if (picList.length === 0) return;
    return (
        <>  
            <div className="detail_up_title">
                <h1>PICTURES</h1>
            </div>
            <div className="room_detail_container">
                {picList.map((pv, pi) => {
                    return (
                        <Fragment key={pi}>
                            <div
                                className={
                                    "detail_up_content filled-text" + (pi + 1)
                                }
                            >
                                {pv.room_folder} ROOM
                            </div>
                            <div
                                className={
                                    "detail_up_content outline-text" + (pi + 1)
                                }
                            >
                                {pv.room_folder} ROOM
                            </div>
                            <img
                                className={"image" + (pi + 1)}
                                src={
                                    "/room_imgs/" +
                                    pv.room_folder +
                                    "/" +
                                    pv.pic_name
                                }
                                alt=""
                            />
                        </Fragment>
                    );
                })}
            </div>
        </>
    );
}

export default DetailPictures;
