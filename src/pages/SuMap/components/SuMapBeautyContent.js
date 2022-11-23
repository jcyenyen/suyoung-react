import SuMapLeftNav from './SuMapLeftNav'
import SuMapRight from './SuMapRight'
import React, { useState } from 'react'
import Modal from './Modal/Modal'
import CarouselMap from './CarouselMap'
import CarouselMapDesc from './CarouselMapDesc'

const SuMapBeautyContent = (props) => {

    const [displayModal, setDisplayModal] = useState(true)
// 預設是開啟的

  const modalClose = () => {
    setDisplayModal(true)
  }

return <div className="svg_box">
    <div className="map_content">
        <div className="map_content_left">
        <SuMapLeftNav />
        </div>
        <div className="map_content_right">
        <SuMapRight />
        </div>
        <Modal show={displayModal} modalClose={modalClose}>
        {/* 輪播墻外掛https://reactjsexample.com/easy-to-use-responsive-and-customizable-carousel-component-for-react/  */}
        <React.Fragment>
          
        </React.Fragment>
      </Modal>
    </div>
</div>

}

export default SuMapBeautyContent