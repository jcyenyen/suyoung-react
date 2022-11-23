import React, { useEffect } from "react";
import Lottie from "lottie-web";
import SunRiseAnimation from "../../../data/18093-sunrise-in-mountains-v2.json";

const SunRise = () => {
    useEffect(() => {
        Lottie.loadAnimation({
            container: document.querySelector("#sunrise-animation"),
            animationData: SunRiseAnimation,
            loop: true,
            autoplay: true,
        });
    }, []);

    return (
        <>
            <div id="sunrise-animation"></div>
        </>
    );
};

export default SunRise;
