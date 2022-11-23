import React, { useState, useEffect } from 'react'
import '../styles/item.scss'
import { motion } from 'framer-motion'
const _ = require('lodash')

function OrderDetail(props) {
  const { setStep, scOrderId, orderType1, orderType2, discountSum } = props
  const [orderAll, setOrderAll] = useState([]) //初始資料

  const [order, setOrder] = useState([])
  async function getOrderListFromServer() {
    const url = `http://localhost:3700/cart/orderDetailFinal?orderSid=${scOrderId}&orderType1=${orderType1}&orderType2=${orderType2}`

    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    // console.log('訂單dataRes', data)
    setOrder(data)

    // console.log('訂單scOrderId', scOrderId)
    // console.log('訂單order', order) //會是空的因為setOrder異步執行
    setOrderAll(data.data)
  }

  useEffect(() => {
    getOrderListFromServer()
  }, [])

  // console.log(order.actList)

  const OrderDisplay = () => (
    <>
      {order && order.roomList.map((v, i) => {
        return (
          <React.Fragment key={i}>
            <div className="item_detail">
              <div className="item_detail_img">
                <img
                  src={`/room_imgs/${v.room_folder}/${v.room_image}`}
                  alt=""
                />
              </div>
              <div className="item_detail_text">
                <p>房型：{v.room_name}</p>
                <p>入住：{v.start_date}</p>
                <p>退房：{v.end_date}</p>
                <p>人數：{v.adults}</p>
                <p>天數：{v.perNight}</p>
                <p>價格：{v.room_price}</p>
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </>
  )

  // console.log("order",order)

  const OrderActDisplay = () => (
    <>
      {order && order.actList.map((v, i) => {
        return (
          <React.Fragment key={i}>
            <div className="event_detail">
              <div className="event_detail_img">
                <img src={`/act_imgs/${v.act_img}`} alt="" />
              </div>
              <div className="event_detail_text">
                <p>名稱：{v.act_name}</p>
                <p>日期：{v.act_day}</p>
                <p>人數：{v.act_people}</p>
                <p>價格：{v.act_price}</p>
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </>
  )
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="first_component_title">訂單內容</h1>
        <div className="order_detail">
          <div className="title">
            <h4>訂單編號：Shuyoung{scOrderId}</h4>
            <div className="title_f">
              {/* <p>
              <i className="fa-solid fa-calendar-check">
              &nbsp;&nbsp;{order.start_date} - {order.end_date}
              </i>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <i className="fa-solid fa-user-large">&nbsp;{order.adults}</i>
            </p> */}
              <p className="order_totalAmont">
                金額：{discountSum}
                {/* {order && order.roomList ? order.roomList[0].totalPrice : null} */}
              </p>
            </div>
          </div>
          <div className="detail">
            {order && order.roomList ? <OrderDisplay /> : null}
            {order && order.actList ? <OrderActDisplay /> : null}
          </div>
        </div>
        <div className="backtoHomepage">
          <button
            className="checkOut1"
            onClick={() => {
              localStorage.removeItem('roomItem')
              localStorage.removeItem('Act')
              window.location.href = 'http://localhost:3777/shuyoung'
            }}
          >
            回首頁
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default OrderDetail

{
  /* <div className="event_detail">
<div className="event_detail_img">
  <img src="" alt="" />
</div>
<div className="event_detail_text">
  <p>活動：漂流探險</p>
  <p>人數：2人</p>
  <p>價格：2000</p>
</div>
</div>
<div className="food_detail">
<div className="food_detail_img">
  <img src="" alt="" />
</div>
<div className="food_detail_text">
  <p>食材：超值烤肉露營組(安心豬肉) 4-6人份 </p>
  <p>數量：1組 </p>
  <p>價格：$1580</p>
</div>
</div> */
}
