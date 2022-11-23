import React from 'react'


function MapFamily (props) {
  return (
    <>
    <div className='popup_window'>
          <div className='window_des'>
          <div className='des_picture_wangmei1'>
            <img src="http://localhost:3777/map_imgs/qingzi1.png" alt="" />
            </div>
            <div>
            <br />
                <h5>親子同樂帳</h5>
                <br />
                <div  className='des_content_wangmei'>
                <p>舒營的親子同樂帳適合家裡有孩童的家庭入住，房內設有溜滑梯跟床鋪合一的遊樂設施，讓小朋友能夠玩的開心，此外也有提供童話書書櫃以及徹底消毒的手套布偶，讓您省去尋找床邊故事素材的煩惱。</p>
                <br />
                <button className='seemore_map_booking'>點擊前往訂房</button>
                </div>
            </div>
          </div>
          <div className='window_des'>
          <div className='des_picture_family2'>
          <img src="http://localhost:3777/map_imgs/qingzi2.png" alt="" />
          </div>
          <div>
            <br />
                <h5>闔家歡樂帳</h5>
                <br />
                <div  className='des_content_wangmei'>
                <p>舒營的親子同樂帳適合家中有青少年的孩子入住，房內設有投影片大型熒幕，只要選擇闔家歡樂帳，即可至營本部租借遊戲機一台（如switch、PS5）此外電視也可鏈接串流影音服務，增添樂趣。</p>
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



export default MapFamily
