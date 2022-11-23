import React from 'react'

function MapFood() {
  return (
    <div className='popup_window'>
          <div className='window_des'>
          <div className='des_picture_wangmei1'>
            <img src="http://localhost:3777/recipes_imgs/africaEgg.png" alt="" />
            </div>
            <div>
                <div  className='des_content_wangmei'>
                <p>懶人福音！舒營提供多種食材套餐組合供您選擇，讓您只要人來就可以直接開始烤。</p>
                <br />
                <button className='seemore_map_booking'>訂購新鮮食材</button>
                </div>
            </div>
          </div>
          <button className='popup_exit_btn' onClick={()=>{window.location.href="http://localhost:3777/shuyoung/SuMap"}}>
              X
            </button>
    </div>
  )
}

export default MapFood