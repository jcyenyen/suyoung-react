import React, { useEffect } from "react";
import Lottie from "lottie-web";
import sunAnimation from "../../../data/77378-sunset.json";

const Sun = () => {
    useEffect(() => {
        Lottie.loadAnimation({
            container: document.querySelector("#sun-animation"),
            animationData: sunAnimation,
            loo: true,
            autoplay: true,
        });
    }, []);

    return (
        <>
            <div id="sun-animation" style={{ width: 150, height: 150 }}></div>
        </>
    );
};

export default Sun;
