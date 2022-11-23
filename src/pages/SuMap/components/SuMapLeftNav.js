import React, { useState } from 'react'
import Modal from './Modal/Modal'
import CarouselMap from './CarouselMap'
import CarouselMapDesc from './CarouselMapDesc'
import '../SuMap.css'

// content導入後為js資料
import content from './Content.json'

function SuMapLeftNav(props) {
//   const [displayModal, setDisplayModal] = useState(false)
//   // 記錄索引值，從0開始
//   const [contentIndex, setContentIndex] = useState(0)
//   const [mapPicIndex,setmapPicIndex] =useState(0)
const { modalOpen } = props

//   const modalOpen = (i) => {
//     // 這裡設定content要抓取的資料索引值
//     setContentIndex(i)
//     setmapPicIndex(i)
//     setDisplayModal(true)
//     // setStep(i);
//   }

//   const modalClose = () => {
//     setDisplayModal(false)
//   }

  return (
    <>
      <div className='descripe_content'>
        <ul>
          <div className='link_btn'>
            <a onClick={() => modalOpen(0)}>
              <li>營本部</li>
            </a>
          </div>
          <div className='link_btn'>
            {/* TODO:目前是希望能按不同的link之後可以鏈接到不同的內容（去抓json的index就會自動代入最下方Modal的內容） */}
            <a onClick={() => modalOpen(1)}>
              <li>頂級網美區</li>
            </a>
          </div>
          <div className='link_btn'>
            <a onClick={() => modalOpen(2)}>
              <li>不求人露營區</li>
            </a>
          </div>
          <div className='link_btn'>
            <a onClick={() => modalOpen(3)}>
              <li>溫馨親子區</li>
            </a>
          </div>
          <div className='link_btn'>
            <a onClick={() => modalOpen(4)}>
              <li>高級露營車區</li>
            </a>
          </div>
          <div className='link_btn'>
            <a onClick={() => modalOpen(5)}>
              <li>星空大草原</li>
            </a>
          </div>
          <div className='link_btn'>
            <a onClick={() => modalOpen(6)}>
              <li>活動專區</li>
            </a>
          </div>
        </ul>
      </div>
      {/* <Modal show={displayModal} modalClose={modalClose}> */}
        {/* 輪播墻外掛https://reactjsexample.com/easy-to-use-responsive-and-customizable-carousel-component-for-react/  */}
        {/* <React.Fragment> */}
          {/* <div className='popup_window'> */}
            {/* <CarouselMap step={mapPicIndex}/> */}
            {/* TODO:輪播墻的內容要如何使用json檔呈現？本身是套件好像不能擅自更動？ */}
            {/* 這裡呈現資料，content與contentIndex會找到對應的 */}
            {/* {content[contentIndex]} */}
            {/* <div className='popup_content_right'> */}
              {/* <CarouselMapDesc step={contentIndex} /> */}
              {/*TODO:這邊是要怎麼去呈現CarouselMapDesc的內容（隨著內容點擊切換component的資料） step={step} ？ */}
            {/* </div> */}
            {/* <button className='popup_exit_btn' onClick={modalClose}> */}
              {/* X */}
            {/* </button> */}
          {/* </div> */}
         {/* </React.Fragment> */}
       {/* </Modal> */}
    </>
  )
}

export default SuMapLeftNav

