import SuMapLeftNav from './SuMapLeftNav'
import SuMapRight from './SuMapRight'
import React, { useState } from 'react'
import Modal from './Modal/Modal'
import CarouselMap from './CarouselMap'
import CarouselMapDesc from './CarouselMapDesc'
import MapCont from './MapCont'
import MapBeauty from './MapBeauty'
import MapYourself from './MapYourself'
import MapFamily from './MapFamily'
import MapVan from './MapVan'
import MapFood from './MapFood'
import MapStar from './MapStar'
import MapAct from './MapAct'

const SuMapContent = (props) => {

    const [displayModal, setDisplayModal] = useState(false)
  // 記錄索引值，從0開始
  const [contentIndex, setContentIndex] = useState(0)
  const [mapPicIndex,setmapPicIndex] =useState(0)

  const [step, setStep] = useState(0)
  // 動態元件
  const components = [[MapCont,MapFood],[MapCont,MapBeauty],[MapCont,MapYourself],[MapCont,MapFamily],[MapCont,MapVan],[MapCont,MapStar],[MapCont,MapAct]];

  const BlockComponent = components[contentIndex][step];

// const components = [MapCont, MapBeauty]
// const BlockComponent = components[step]

  const modalOpen = (i) => {
    // 這裡設定content要抓取的資料索引值
    setContentIndex(i)
    setmapPicIndex(i)
    setDisplayModal(true)
    // setStep(i);
  }
// console.log(modalOpen.setmapPicIndex)


  const modalClose = () => {
    setDisplayModal(false)
  }




return <div>
        <div className="svg_box">
            <div className="map_content">
                <div className="map_content_left">
                    <SuMapLeftNav modalOpen={modalOpen} />
                </div>
                <div className="map_content_right">
                    <SuMapRight modalOpen={modalOpen}/>
                </div>
                <Modal show={displayModal} modalClose={modalClose}>
                {/* 輪播墻外掛https://reactjsexample.com/easy-to-use-responsive-and-customizable-carousel-component-for-react/  */}
                 <BlockComponent setDisplayModal={setDisplayModal} mapPicIndex={mapPicIndex} contentIndex={contentIndex} setStep={setStep}/>
                </Modal>
            </div>
         </div>
         <div className='aligncontent_mb'>
         <div className='svg_box_mobile'></div>
         <h3 className='titlearea_mobile'>頂級網美區</h3>
         <div className='areacard_mobile'>
            <img src="http://localhost:3777/map_imgs/roomC1.jpg" alt="" />
            <h5>舒營園區的大人氣！提供頂級星空帳、印第安帳、網美神殿帳三種帳型，滿足您想要拍攝美照的慾望。</h5>
            <button className='map_btn_mobile'>前往訂房頁查看更多</button>
         </div>
         <div className='svg_box_mobile1'></div>
         <h3 className='titlearea_mobile1'>高級露營車區</h3>
         <div className='areacard_mobile'>
            <img src="http://localhost:3777/map_imgs/campingvan2.jpg" alt="" />
            <h5>情侶首推的最佳選擇！提供賞星露營車、望山露營車兩種車型做選擇，滿足您所有浪漫的想象。</h5>
            <button className='map_btn_mobile'>前往訂房頁查看更多</button>
         </div>
         <div className='svg_box_mobile2'></div>
         <h3 className='titlearea_mobile1'>不求人露營區</h3>
         <div className='areacard_mobile'>
            <img src="http://localhost:3777/map_imgs/yeren2.jpg" alt="" />
            <h5>想要都自己來的最佳選擇！提供三種場地做選擇，分階段滿足您想自己搭帳篷的慾望。</h5>
            <button className='map_btn_mobile'>前往訂房頁查看更多</button>
         </div>
         <div className='svg_box_mobile3'></div>
         <h3 className='titlearea_mobile1'>溫馨親子區</h3>
         <div className='areacard_mobile'>
            <img src="http://localhost:3777/map_imgs/family3.jpg" alt="" />
            <h5>大朋友小朋友的最愛！有兩種房型提供選擇，園區設有溜滑梯及戲水池，讓小朋友能超開心。</h5>
            <button className='map_btn_mobile'>前往訂房頁查看更多</button>
         </div>
         </div>
</div>
}

export default SuMapContent