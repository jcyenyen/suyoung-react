import React, { useState, useEffect } from 'react'
import AddOn from './Component/AddOn'
import RoomInfo from './Component/RoomInfo'
import RoomLt from './Component/RoomLt'
import RoomMo from './Component/RoomMo'
import ActInfo from './Component/ActInfo'
import '../../styles/item.scss'
import { set } from 'lodash'
const _ = require('lodash')

function Index(props) {
  const {
    setStep,
    roomItem,
    sum,
    setSum,
    orderBooking,
    HandleAlertBuy,
    HandleAlert,
    discountSum,
    setdiscountSum,
    setOrderActList,
    orderActList,
    setOrderBooking
  } = props

  const [totalPrice, setTotalPrice] = useState();
  const [actSum, setActSum] = useState();
  const [roomSum, setRoomSum] = useState();

  useEffect(() => {
      if(actSum || roomSum) setTotalPrice(actSum + roomSum)
  }, [actSum,roomSum])
  
  // setTotalPrice({...totalPrice,actPrice:})

  // useEffect(()=>{
  //   let total = "";
  //   let room = totalPrice.roomPrice;
  //   let act = totalPrice.actPrice;
  //   total = room + act;
  //   setTotalPrice({...totalPrice,totalPrice:total});
  // },[totalPrice])

  // 處理訂單送出
  const OrderSubmit = async (e) => {
    if (!_.isEmpty(orderBooking)) {
      // 購物車內有商品
      setStep(2)
    }
    if (_.isEmpty(orderBooking)) {
      // 如果購物車內沒有商品的話
      HandleAlertBuy()
      setStep(1)
    }
  }

  return (
    <>
      <h1 className="first_component_title">購物車內容</h1>
      <div className="room_info_and_web_component1">
        <div className="w100">
          <RoomInfo
            setSum={setSum}
            orderBooking={orderBooking}
            setOrderBooking={setOrderBooking}
            setTotalPrice={setTotalPrice}
            totalPrice={totalPrice}
            roomSum={roomSum}
            setRoomSum={setRoomSum}
          />
          <ActInfo
            orderBooking={orderBooking}
            actSum = {actSum}
            setActSum = {setActSum}
            setOrderActList={setOrderActList}
            orderActList={orderActList}
          />
        </div>

        <RoomLt
          setStep={setStep}
          sum={sum}
          setSum={setSum}
          setActSum={setActSum}
          OrderSubmit={OrderSubmit}
          discountSum={discountSum}
          setdiscountSum={setdiscountSum}
          totalPrice={totalPrice}
          actSum={actSum}
          roomSum={roomSum}
        />
        <RoomMo
          // setStep={setStep}
          // sum={sum}
          // setSum={setSum}
          // actSum={actSum}
          // setActSum={setActSum}
          // OrderSubmit={OrderSubmit}
          // discountSum={discountSum}
          // setdiscountSum={setdiscountSum}
          // totalPrice={totalPrice}
          sum={sum}
          setSum={setSum}
          setActSum={setActSum}
          OrderSubmit={OrderSubmit}
          discountSum={discountSum}
          setdiscountSum={setdiscountSum}
          totalPrice={totalPrice}
          actSum={actSum}
          roomSum={roomSum}
        />
      </div>
    </>
  )
}

export default Index
