// import '../styles/footer.scss'
// import '../styles/navbar.scss'
// import '../css/su_map.css'
import "./SuMap.css";
import React, { useEffect } from "react";
import { useBackground } from "../../utils/useBackground";

// import SuMapNav from "./components/SuMapNav";
import SuMapContent from "./components/SuMapContent";
// import SuMapFooter from "./components/SuMapFooter";

function SuMap() {
    const { setBackground } = useBackground();

    useEffect(() => {
        setBackground("green_map.svg");
    }, []);
    return (
        <div>
            {/* <SuMapNav/> */}
            <SuMapContent />
            {/* <SuMapFooter/> */}
        </div>
    );
}

export default SuMap;
