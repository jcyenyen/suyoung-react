import React from 'react'

function MapStar() {
  return (
    <div className='popup_window'>
          <div className='window_des'>
          <div className='des_picture_wangmei1'>
            <img src="http://localhost:3777/recipes_imgs/africaEgg.png" alt="" />
            </div>
            <div>
                <div  className='des_content_wangmei'>
                <p>目前暫無活動</p>
                <br />
                <button className='seemore_map_booking'></button>
                </div>
            </div>
          </div>
          <button className='popup_exit_btn' onClick={()=>{window.location.href="http://localhost:3777/shuyoung/SuMap"}}>
              X
            </button>
    </div>
  )
}

export default MapStar