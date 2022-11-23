// import '../styles/footer.scss'
// import '../styles/navbar.scss'
// import '../css/su_map.css'
import './SuMap.css'

import React, {useEffect} from 'react';
// import SuMapNav from "./components/SuMapNav";
// import SuMapContent from "./components/SuMapContent";
// import SuMapFooter from "./components/SuMapFooter";
import SuMapBeautyContent from './components/SuMapBeautyContent';
import { useBackground } from "../../utils/useBackground";

function  SuMap(){
    const { setBackground } = useBackground();

    useEffect(() => {
        setBackground("green_map.svg");
    }, []);

    return(
        <div>
    <SuMapBeautyContent/>     
        </div>
    )
}

export default SuMap