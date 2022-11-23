import React, { useState, useEffect } from 'react'
import 'animate.css'
import { motion } from 'framer-motion'
import Axios from "axios";
import { useBookingCart } from "../../../../../utils/useBookingCart";


const _ = require('lodash')
const Swal = require('sweetalert2')

function RoomInfo(props) {
  const {
    setSum,
    updateQty,
    roomSum,
    setRoomSum,
    orderBooking,
    setOrderBooking,
  } = props
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])
  const { bookingCart, setBookingCart } = useBookingCart();


  //房型
  function getCartFromLocalStorage() {
    const newCart = localStorage.getItem('roomItem') || '[]'

    // updateQty()

    // console.log(JSON.parse(newCart))
    setMycart(JSON.parse(newCart))
  }
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  // 計算總價用的函式
  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].roomTotalPrice || items[i].total_price
    }
    // setSum(total)
    setRoomSum(total)
    // console.log(total)
    // return total
  }
  useEffect(() => {
    // console.log(mycart)
    sum(mycart)
  }, [mycart])

  // componentDidUpdate
  // useEffect(() => {
  //   // mycartDisplay運算
  //   let newMycartDisplay = []

  //   //尋找mycartDisplay
  //   for (let i = 0; i < mycart.length; i++) {
  //     const index = newMycartDisplay.findIndex(
  //       (value) => value.id === mycart[i].roomSid
  //     )
  //     console.log(index)
  //     //有的話就數量+1
  //     if (index !== -1) {
  //       newMycartDisplay[index].amount += mycart[i].amount
  //     } else {
  //       //沒有的話就把項目加入，數量為1
  //       const newItem = { ...mycart[i] }
  //       newMycartDisplay = [...newMycartDisplay, newItem]
  //     }
  //   }

  //   console.log(newMycartDisplay)
  //   setMycartDisplay(newMycartDisplay)
  // }, [mycart])

  // console.log([mycart])

  // console.log([mycartDisplay])

  // 製作按下X按鈕執行delItem函式刪除localStorage單筆資料
  const delItem = (item) => {
    // 先複製原有的購物車內容
    const currentCart = mycart;
    // console.log(currentCart)

    
    // 剔除該筆資料存進新的陣列 newCart 
    const newCart = currentCart.filter((v) => v!==item )
    
    // // 複製
    // const oldTotalBookingCart = totalBookingCart;

    // const newTotalBookingCart = oldTotalBookingCart.filter((v)=> v.room_id !== item.room_id)

    // setTotalBookingCart(newTotalBookingCart);

  
      // 找到的話就透過splice來移除array中的那個物件
      // 再更新至localStorage cart之中並且更新Mycart
      // currentCart.splice(index, 1)

      // 存進 localStorage
      localStorage.setItem('roomItem', JSON.stringify(newCart))
      // 更新 myCart
      setMycart(newCart)
    

    // const oldRoom = orderBooking
    // const nowRoom = oldRoom.filter((v) => v !== item)
    setOrderBooking(newCart)

    setBookingCart(newCart)
    deleteTemporaryCart(item)
  }

  // 刪除購物車的商品
  const deleteTemporaryCart = async (item) => {

    const roomSid = item.roomSid || item.sid;
    const memberId = item.memberId || item.member_id;
    const startDate = item.startDate || item.start_date;
    const endDate = item.endDate || item.end_date;

    const res = await Axios.delete(
        `http://localhost:3700/Booking/deleteTemporaryCart?memberId=${memberId}&roomSid=${roomSid}&startDate=${startDate}&endDate=${endDate}`
    );
    // console.log(res);
};

  function DeleteCartItem(item) {
    Swal.fire({
      title: '您確定要刪除此商品?',
      text: '不再多考慮一下嘛!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '是的，刪除!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    }).then((result) => {
      // console.log(result.isConfirmed)
      if (result.isConfirmed) {
        delItem(item)
        Swal.fire('已刪除!', '您的商品已刪除！', 'success')
      }
    })
  }

  // console.log(sum)

  const displayItems = (
    <>
      {mycart.map((item, index) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            key={index}
          >
            <div className="room_info">
              <div className="room_pic">
                <img
                  src={`/room_imgs/${item.room_folder}/${item.room_image}`}
                  alt=""
                />
              </div>
              <div className="room_detail">
                <p>房型：{item.room_name}</p>
                <p>入住：{item.startDate || item.start_date}</p>
                <p>退房：{item.endDate || item.end_date}</p>
                <p>成人：{item.adults || item.num_adults}</p>
                <p>兒童：{item.kids || item.num_children}</p>
                <p>天數：{item.perNight}</p>
                <div className="amount_and_del">
                  <p>價格：${item.roomTotalPrice || item.total_price}</p>
                  <button
                    className="del_btn"
                    onClick={() => {
                      DeleteCartItem(item)
                    }}
                  >
                    刪除
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </>
  )

  // const ScPriceRow = (
  //   <>
  //     {/* 總金額列 */}
  //     <div className="totalPriceFont col-3 px-0">房價總計</div>
  //     <div className="totalPriceFont-med col-3 px-0">
  //       NT<span>{sum(mycartDisplay)}</span>
  //     </div>
  //   </>
  // )
  // if (mycartDisplay.length === 0) return <></>
  return <>{displayItems}</>
}

export default RoomInfo
