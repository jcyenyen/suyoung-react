import React, { useEffect, useRef, useState } from "react";
import MRegister from "./components/MRegister";
import MLogin from "./components/MLogin";
import { useAuth } from "../Login/sub-pages/AuthProvider";
import {
    MouseParallaxContainer,
    MouseParallaxChild,
} from "react-parallax-mouse";

import { useSpring, animated as a } from "react-spring";

const Index = () => {
    const { setAuth, ...auth } = useAuth();

    const [flipped, setFlipped] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(-${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    return (
        <>
            <div className="toggle">
                <button
                    type="button"
                    className="toggle-switch"
                    onClick={() => setFlipped(!flipped)}
                >
                    切換 登入/註冊
                </button>
            </div>
            <div className="card-outer">
                <a.div
                    className="card-front flipcard"
                    style={{
                        opacity: opacity.interpolate((o) => 1 - o),
                        transform,
                    }}
                >
                    <MLogin />
                </a.div>
                <a.div
                    className="card-back flipcard"
                    style={{
                        opacity,
                        transform: transform.interpolate(
                            (t) => `${t} rotateY(180deg)`
                        ),
                    }}
                >
                    <MRegister flipped={flipped} setFlipped={setFlipped} />
                </a.div>
                <MouseParallaxContainer
                    containerStyles={{ position: "absolute", zIndex: "-1" }}
                >
                    <MouseParallaxChild
                        factorX={0.003}
                        factorY={0.003}
                        // updateStyles={{
                        //     background: "transparent",
                        //     backgroundPositionY: "50%",
                        //     transform: "scale(1.2)",
                        //     position: "absolute",
                        //     filter: "blur(4px) brightness(50%)",
                        //     backgroundSize: "auto",
                        //     backgroundRepeat: "repeat",
                        //     width: "100%",
                        //     height: "100%",
                        //     backfaceVisibility: "hidden",
                        // }}
                    />

                    <MouseParallaxChild factorX={0.018} factorY={0.018}>
                        <img
                            className="layer5"
                            src="/member_img/layer/layer5.svg"
                            alt=""
                        />
                    </MouseParallaxChild>

                    <MouseParallaxChild factorX={-0.018} factorY={-0.018}>
                        <img
                            className="layer4"
                            src="/member_img/layer/layer4.svg"
                            alt=""
                        />
                    </MouseParallaxChild>
                    <MouseParallaxChild factorX={0.014} factorY={0.014}>
                        <img
                            className="layer3"
                            src="/member_img/layer/layer3.svg"
                            alt=""
                        />
                    </MouseParallaxChild>
                    <MouseParallaxChild factorX={-0.016} factorY={0.016}>
                        <img
                            className="layer2"
                            src="/member_img/layer/layer2.svg"
                            alt=""
                        />
                    </MouseParallaxChild>
                    <MouseParallaxChild factorX={0.018} factorY={-0.018}>
                        <img
                            className="layer1"
                            src="/member_img/layer/layer1.svg"
                            alt=""
                        />
                    </MouseParallaxChild>
                </MouseParallaxContainer>
            </div>
        </>
    );
};

export default Index;
