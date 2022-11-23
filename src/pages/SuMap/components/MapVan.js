import React from 'react'


function MapVan (props) {
  return (
    <>
    <div className='popup_window'>
          <div className='window_des'>
          <div className='des_picture_wangmei1'>
            <img src="http://localhost:3777/map_imgs/luyingche1.png" alt="" />
            </div>
            <div>
            <br />
                <h5>賞星露營車</h5>
                <br />
                <div  className='des_content_wangmei'>
                <p>舒營的賞星露營車是情侶遊客中的口碑好選擇，舒適大床、隔音好的內裝以及透明天窗，可以讓整體浪漫體驗大幅升級，此外車體外設有大吊床，可以讓您在外面也能體會chill浪漫的感覺。</p>
                <br />
                <button className='seemore_map_booking'>點擊前往訂房</button>
                </div>
            </div>
          </div>
          <div className='window_des'>
          <div className='des_picture_family2'>
          <img src="http://localhost:3777/map_imgs/luyingche2.png" alt="" />
          </div>
          <div>
            <br />
                <h5>望山露營車</h5>
                <br />
                <div  className='des_content_wangmei'>
                <p>舒營的望山露營車是情侶遊客中的人氣好選擇，隔音好的內裝以及可一望山景的單面透明窗戶，可以讓整體浪漫體驗大幅升級，而車內還有另外一大特色為天花板電影院，可通過投影機播放串流影音也是一大特色。</p>
                <br />
                <button className='seemore_map_booking'>點擊前往訂房</button>
                </div>

            </div>
          </div>
            <button className='popup_exit_btn' onClick={()=>{window.location.href="http://localhost:3777/shuyoung/SuMap"}}>
              X
            </button>
          </div>
    </>
  )
}



export default MapVan