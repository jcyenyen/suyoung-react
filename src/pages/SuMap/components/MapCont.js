import React, { useState, useEffect } from "react";
import CarouselMap from './CarouselMap'
import CarouselMapDesc from './CarouselMapDesc'


function MapCont(props) {
    const {setDisplayModal,mapPicIndex,contentIndex, setStep} = props;
    const modalClose = () => {
        setDisplayModal(false)
      }
    //   const modalOpen = (i) => {
    //     // 這裡設定content要抓取的資料索引值
    //     setContentIndex(i)
    //     setmapPicIndex(i)
    //     setDisplayModal(true)
    //     // setStep(i);
    //   }
  
    return <>
     <div className='popup_window'>
            <CarouselMap step={mapPicIndex}/>
            {/* TODO:輪播墻的內容要如何使用json檔呈現？本身是套件好像不能擅自更動？ */}
            {/* 這裡呈現資料，content與contentIndex會找到對應的 */}
            {/* {content[contentIndex]} */}
            <div className='popup_content_right'>
              <CarouselMapDesc step={contentIndex} setStep={setStep}/>
              {/*TODO:這邊是要怎麼去呈現CarouselMapDesc的內容（隨著內容點擊切換component的資料） step={step} ？ */}
            </div>
            <button className='popup_exit_btn' onClick={modalClose}>
              X
            </button>
          </div>
    </>;
}

export default MapCont;
