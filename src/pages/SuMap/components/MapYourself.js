import React from 'react'


function MapYourself (props) {
  return (
    <>
    <div className='popup_window'>
          <div className='window_des'>
          <div className='des_picture_buqiuren1'>
            <img src="http://localhost:3777/map_imgs/buqiuren.png" alt="" />
            </div>
            <div>
            <br />
                <h5>木棧板區</h5>
                <br />
                <div  className='des_content_wangmei'>
                <p>舒營設有多個木棧板區，提供給想要從頭到尾享受搭建帳篷樂趣的遊客，木棧板大小為6坪，除了能支援搭建帳篷外，也可使用小型帳篷加自備桌椅放在外面，讓您能夠發揮您的想象力來運用，一同度過難忘假期。</p>
                <br />
                <button className='seemore_map_booking'>點擊前往訂房</button>
                </div>
            </div>
          </div>
          <div className='window_des'>
          <div className='des_picture_wangmei2'>
          <img src="http://localhost:3777/map_imgs/buqiuren2.png" alt="" />
          </div>
          <div>
            <br />
                <h5>搭棚遮雨區</h5>
                <br />
                <div  className='des_content_wangmei'>
                <p>舒營的搭棚遮雨區適合有基礎帳篷裝備的朋友，遮雨棚材質不透光且防水能力佳，不用擔心夏日艷陽或者強烈的午後雷陣雨，適合在各種天氣環境下增加使用空間，另外一大優勢是不用擔心設備受潮難收拾。</p>
                <br />
                <button className='seemore_map_booking'>點擊前往訂房</button>
                </div>

            </div>
          </div>
          <div className='window_des'>
          <div className='des_picture_wangmei3'>
          <img src="http://localhost:3777/map_imgs/buqiuren3.png" alt="" />
          </div>
          <div>
            <br />
                <h5>木製屋頂區</h5>
                <br />
                <div  className='des_content_wangmei'>
                <p>舒營的木製屋頂區與搭棚遮雨區功能類似，皆有不透光且防水能力佳的特性，不用擔心夏日艷陽或強烈的午後雷陣雨，適合在各種天氣環境下增加使用空間，而木製的另一大特色是能聞到天然的木頭香味。</p>
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



export default MapYourself

