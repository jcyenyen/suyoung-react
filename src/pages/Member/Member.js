import React, { useState, useEffect } from "react";
import axios from "axios";
import MemberCenter from "./components/MemberCenter";
import MemberCenterCenter from "./components/MemberCenterCenter";
import { useBackground } from "../../utils/useBackground";
import {
    MouseParallaxContainer,
    MouseParallaxChild,
} from "react-parallax-mouse";

function Member(props) {
    const { setBackground , background } = useBackground();

   const [layer1 , setLayer1] = useState('layer1.svg');
   const [layer2 , setLayer2] = useState('layer2.svg');
   const [layer3 , setLayer3] = useState('layer3.svg');
   const [layer4 , setLayer4] = useState('layer4.svg');

    useEffect(()=>{

        if(background === "darkBGlayer.svg"){
            setLayer1("darklayer1.svg");
            setLayer2("darklayer2.svg");
            setLayer3("darklayer3.svg");
            setLayer4("darklayer4.svg");
        }else{
            setLayer1("layer1.svg");
            setLayer2("layer2.svg");
            setLayer3("layer3.svg");
            setLayer4("layer4.svg");
        }



    },[background])



    return (
        <>
            <MemberCenter>
                <MemberCenterCenter />
            </MemberCenter>
            <MouseParallaxContainer
                containerStyles={{
                    position: "absolute",
                    zIndex: "0",
                    bottom: "10%",
                    top: "auto",
                }}
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
                        src={`/member_img/layer/${layer4}`}
                        alt=""
                    />
                </MouseParallaxChild>
                <MouseParallaxChild factorX={0.014} factorY={0.014}>
                    <img
                        className="layer3"
                        src={`/member_img/layer/${layer3}`}
                        alt=""
                    />
                </MouseParallaxChild>
                <MouseParallaxChild factorX={-0.016} factorY={0.016}>
                    <img
                        className="layer2"
                        src={`/member_img/layer/${layer2}`}
                        alt=""
                    />
                </MouseParallaxChild>
                <MouseParallaxChild factorX={0.018} factorY={-0.018}>
                    <img
                        className="layer1"
                        src={`/member_img/layer/${layer1}`}
                        alt=""
                    />
                </MouseParallaxChild>
            </MouseParallaxContainer>

            <div className="animation-wrapper">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
            </div>
        </>
    );
}

export default Member;
