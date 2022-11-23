import React, { useState, useEffect } from 'react'
import 'animate.css'
import { motion } from 'framer-motion'

const _ = require('lodash')
const Swal = require('sweetalert2')

function ActInfo(props) {
  const { actSum, setActSum, setOrderActList, orderActList } = props

  const [mycart1, setMycart1] = useState([])
  const [mycartDisplay1, setMycartDisplay1] = useState([])

  //房型
  function getActCartFromLocalStorage() {
    const newCart = localStorage.getItem('Act') || '[]'

    // updateQty()

    // console.log(JSON.parse(newCart))
    setMycart1(JSON.parse(newCart))
  }
  useEffect(() => {
    getActCartFromLocalStorage()
  }, [])

  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].totalPrice
    }
    // setActSum(total)
    setActSum(total)
    return total
  }
  useEffect(() => {
    // console.log(mycart1)
    sum(mycart1)
  }, [mycart1])
  // componentDidUpdate
  // useEffect(() => {
  //   // mycartDisplay運算
  //   let newMycartDisplay = []

  //   //尋找mycartDisplay
  //   for (let i = 0; i < mycart1.length; i++) {
  //     const index = newMycartDisplay.findIndex(
  //       (value) => value.id === mycart1[i].actSid
  //     )
  //     console.log(index)
  //     //有的話就數量+1
  //     if (index !== -1) {
  //       newMycartDisplay[index].amount += mycart1[i].amount
  //     } else {
  //       //沒有的話就把項目加入，數量為1
  //       const newItem = { ...mycart1[i] }
  //       newMycartDisplay = [...newMycartDisplay, newItem]
  //     }
  //   }

  //   console.log(newMycartDisplay)
  //   setMycartDisplay1(newMycartDisplay)
  // }, [mycart1])
  // console.log(mycart1);
  // const myCartPrice = mycart1[0].totalPrice
  // setTotalPrice({ ...totalPrice, actPrice: myCartPrice })

  // console.log([mycart1])

  // console.log([mycartDisplay1])

  // 製作按下X按鈕執行delItem函式刪除localStorage單筆資料
  const delItem = (item) => {
    // 先複製原有的購物車內容
    const currentCart = JSON.parse(localStorage.getItem('Act')) || []

    // 找尋是否有此筆item.id的對應資料
    const index = currentCart.findIndex((v) => v.id === item.actSid)

    if (index > -1) {
      // 找到的話就透過splice來移除array中的那個物件
      // 再更新至localStorage cart之中並且更新Mycart
      currentCart.splice(index, 1)
      localStorage.setItem('Act', JSON.stringify(currentCart))
      setMycart1(currentCart)
    }
    const oldAct = orderActList
    const nowAct = oldAct.filter((v) => v !== v.actSid)
    setOrderActList(nowAct)
  }

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

  const displayItems = (
    <>
      {mycart1 && mycart1.length
        ? mycart1.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                key={item.actSid}
              >
                <div className="room_info">
                  <div className="room_pic">
                    <img src={`/act_imgs/${item.actImg}`} alt="" />
                  </div>
                  <div className="room_detail_act">
                    <p>名稱：{item.actName}</p>
                    <p>日期：{item.date}</p>
                    <p>人數：{item.people}</p>
                    <div className="amount_and_del">
                      <p>價格：${item.totalPrice}</p>
                      <button
                        className="del_btn"
                        onClick={() => {
                          DeleteCartItem(mycart1)
                        }}
                      >
                        刪除
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })
        : null}
    </>
  )
  // if (mycartDisplay1.length === 0) return <></>
  return <>{displayItems}</>
}

export default ActInfo
