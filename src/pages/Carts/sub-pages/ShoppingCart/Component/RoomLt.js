import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function RoomLt(props) {
  const {
    setStep,
    sum,
    OrderSubmit,
    discountSum,
    setdiscountSum,
    actSum,
    totalPrice,
    roomSum
  } = props

  const navigate = useNavigate()

  const [couponId, setCouponId] = useState(0)

  const [couponDiscount, setcouponDiscount] = useState(1)
  // // 折扣後總金額
  // const [discountSum, setdiscountSum] = useState(0);

  const handleOnChange = (event) => {
    setCouponId(event.target.value)
  }

  const Swal = require('sweetalert2')

  // console.log(couponId)

  function HandleAlertData() {
    Swal.fire({
      // imageUrl: '/cart_imgs/warning.gif',
      icon: 'error',
      title: '錯誤',
      text: '沒有這個折扣碼喔～!',
      timer: 3000,
    })
  }

  function HandleCouponAlert() {
    Swal.fire({
      // imageUrl: '/cart_imgs/5.gif',
      icon: 'success',
      title: '金額已為您折扣',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  //取得折價券
  const getCoupn = () => {
    axios.get(`http://localhost:3700/cart/coupn/${couponId}`).then((res) => {
      if (!res.data.coupon) {
        HandleAlertData()
      } else {
        // console.log(res)

        const couponDiscountNumber = res.data.coupon

        // console.log(couponDiscountNumber)

        setcouponDiscount(couponDiscountNumber)

        HandleCouponAlert()
      }
    })
    return setTimeout(() => {
      couponDiscountRange()
    }, 0)
  }

  // console.log(sum)

  const couponDiscountRange = () => {
    if (couponDiscount > 1) {
      const newDiscountedSum = totalPrice - couponDiscount
      setdiscountSum(newDiscountedSum)
    } else {
      setdiscountSum(totalPrice * couponDiscount)
    }
  }

  // console.log(discountSum)

  useEffect(() => {
    if (totalPrice) setdiscountSum(totalPrice)
  }, [totalPrice])

  useEffect(() => {
    couponDiscountRange()
  }, [couponDiscount])

  return (
    <div className="web_component1 mb_none">
      <img
        src="/member_img/logo.svg"
        alt=""
        className="web_component1_img mb_none"
      />
      <div className="detail_price">
        <div className="first_colum">
          <p className="room_price_1">房價</p>
          <p className="room_price_2">${roomSum}</p>
        </div>
        <div className="first_colum_act">
          <p className="act_price_1">活動</p>
          <p className="act_price_2">${actSum}</p>
        </div>
        <p className="none">折扣碼：</p>
        <div className="discount_wrap">
          <input
            placeholder="輸入折扣碼"
            type="text"
            className="discount__wrap__input field__error"
            maxLength={15}
            onChange={handleOnChange}
          ></input>
          <button className="discount__wrap__apply" onClick={getCoupn}>
            套用
          </button>
        </div>
        <div className="second_colum">
          <p className="totalPrice">合計</p>
          <p className="">${discountSum}</p>
        </div>
        <div className="checkoutbtn">
          <button
            className="stillBuy"
            onClick={() => {
              navigate('/shuyoung/Booking')
            }}
          >
            繼續訂房
          </button>
          <button className="checkOut" onClick={OrderSubmit}>
            結帳
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomLt
