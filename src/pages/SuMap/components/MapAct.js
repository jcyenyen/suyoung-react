import React from 'react'

function MapAct() {
  return (
    <div className='popup_window'>
          <div className='window_des'>
          <div className='des_picture_wangmei1'>
            <img src="http://localhost:3777/recipes_imgs/africaEgg.png" alt="" />
            </div>
            <div>
                <div  className='des_content_wangmei'>
                <p>不想想行程？舒營提供多種活動供您選擇，讓您只要人來就可以直接開始走。</p>
                <br />
                <button className='seemore_map_booking'>查看更多活動</button>
                </div>
            </div>
          </div>
          <button className='popup_exit_btn' onClick={()=>{window.location.href="http://localhost:3777/shuyoung/SuMap"}}>
              X
            </button>
    </div>
  )
}

export default MapAct