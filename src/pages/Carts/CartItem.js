import React, { useState, useEffect } from "react";
import axios from "axios";
import AddOn from "./sub-pages/ShoppingCart/Component/AddOn";
import Process from "./components/Process";
import ShoppingCart from "./sub-pages/ShoppingCart";
import CreditCard from "./sub-pages/CreditCard";
import OrderDetail from "./sub-pages/OrderDetail";
import "./styles/item.scss";
import "animate.css";
import { useAuth } from "../../pages/Login/sub-pages/AuthProvider";
import { now } from "lodash";
import { formatInTimeZone } from "date-fns-tz";
import { useBookingCart } from "../../utils/useBookingCart";
import { useBackground } from "../../utils/useBackground";
import { tplTransform } from "rsuite/esm/utils";
import Axios from "axios";
import { useCallback } from "react";
import { useActBookingList } from "../../utils/useActBookingList";


const _ = require("lodash");
const Swal = require("sweetalert2");
const progressNames = ["商品資訊", "付款方式", "購物完成"];

function CartItem(props) {
  const { setBackground } = useBackground()
  useEffect(() => {
    setBackground('bg1.svg')
  }, [])
  const { setAuth, ...auth } = useAuth()
  const { bookingCart, setBookingCart } = useBookingCart()
  const { actBookingList, setActBookingList } = useActBookingList()


  const maxSteps = 3

  const [step, setStep] = useState(1)

  // const [roomItem, setRoomItem] = useState(() => {
  //     const roomItem = localStorage.getItem('roomItem');
  //     return roomItem ? JSON.parse(roomItem) : [];
  // }, [])

  const [sum, setSum] = useState(0)

  const [actSum, setActSum] = useState(0)

  const [orderId, setOrderId] = useState()

  const [orderBooking, setOrderBooking] = useState([])
  const [orderActList, setOrderActList] = useState([])
  const [totalCart, setTotalCart] = useState([])

//   console.log(orderActList)

  // 判斷是房間訂單還是活動訂單
  const [orderType1, setOrderType1] = useState(0)
  const [orderType2, setOrderType2] = useState(0)

    // 折扣後總金額
    const [discountSum, setdiscountSum] = useState(0);

  const pushOrderId = () => {
    setOrderId(orderBooking.order_id)
  }

  const components = [ShoppingCart, CreditCard, OrderDetail]

  const BlockComponent = components[step - 1]

  const progressNames = ['商品資訊', '付款方式', '購物完成']

  const [inputs, setInputs] = useState({
    name: '', //信用卡號碼
    number: '', //信用卡持卡人姓名
    expiry: '', //信用卡有效日期
    cvc: '', //信用卡安全碼
  })

  const Swal = require('sweetalert2')

  //購物車全部商品
  useEffect(() => {
    // if (orderBooking.length >= 1 || orderActList.length >= 1)

    if (orderBooking && !orderActList) {
      setTotalCart([...orderBooking])
    } else if (!orderBooking && orderActList) {
      setTotalCart([...orderActList])
    } else {
      setTotalCart([...orderBooking, ...orderActList])
    }

    // console.log(totalCart)
        
  }, [orderBooking, orderActList])

  // 進購物車第一步
  // 取得loalStorage的值
  useEffect(() => {
        

    // 從localStorage取出購物車資訊，往子女元件傳遞
    setOrderBooking(JSON.parse(localStorage.getItem('roomItem')))
    // const orderItemsStr = JSON.parse(orderItems)
    // console.log(orderItems)

    setOrderActList(JSON.parse(localStorage.getItem('Act')))
    // const orderActStr = (orderAct)
    // console.log(orderActStr)
        
  }, [])

  // 第二步 - 把orderType 存進去Hook 傳給orderDetail 去做篩選
  useEffect(() => {
    // if (!orderActList || !orderBooking) return

    if (orderBooking && orderBooking.length >= 1) setOrderType1(1)
  }, [orderBooking])
  useEffect(() => {
    // if (!orderActList || !orderBooking) return

    if (orderActList && orderActList.length >= 1) setOrderType2(2)
  }, [orderActList])

  const [errors, setErrors] = useState([])

  const [scOrderId, setScOrderId] = useState(0) //訂單編號

  //寫入活動預約
  async function addActOrderToSever(e) {
    const orderId = +new Date()
    setScOrderId(orderId)

    let data = {
      orderAct: [],
    }

    for (let item of orderActList) {
      const date = new Date()

            const actObj = {
                order_id: orderId,
                member_id: auth.m_id,
                act_id: item.actSid,
                act_l_id: item.act_img_id,
                num_people: item.people,
                amount: item.totalPrice,
                order_date: item.date,
            };
            data.orderAct.push(actObj);
        }

        // 連接的伺服器資料網址
        const url = "http://localhost:3700/cart/act/add";

        // 注意資料格式要設定，伺服器才知道是json格式
        // 轉成json檔傳到伺服器
        const request = new Request(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json",
            }),
        });
        // console.log("JSON", JSON.stringify(data));
        // console.log('JSON parse',JSON.parse(JSON.stringify(data)).orderItems)

        const response = await fetch(request);
        const dataRes = await response.json();

        // console.log("伺服器回傳的json資料", dataRes);
    }

    //寫入房型預約
    async function addOrderToSever(e) {
        let data = {
            orderItems: [],
        };

        for (let item of orderBooking) {
            const date = new Date();

            const roomObj = {
                member_id: auth.m_id,
                room_id: item.sid,
                room_type_id: item.room_type_id,
                num_adults: item.adults || item.num_adults,
                num_children: item.kids || item.num_children,
                perNight: item.perNight,
                total_price: item.room_price,
                start_date: item.startDate || item.start_date,
                end_date: item.endDate || item.end_date,
                Booking_Date: formatInTimeZone(
                    date,
                    "Asia/Taipei",
                    "yyyy-MM-dd HH:mm:ss "
                ),
            };
            data.orderItems.push(roomObj);
        }

        // 連接的伺服器資料網址
        const url = "http://localhost:3700/cart/order/add";

        // 注意資料格式要設定，伺服器才知道是json格式
        // 轉成json檔傳到伺服器
        const request = new Request(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json",
            }),
        });
        // console.log("JSON", JSON.stringify(data));
        // console.log('JSON parse',JSON.parse(JSON.stringify(data)).orderItems)

        const response = await fetch(request);
        const dataRes = await response.json();

        // console.log("伺服器回傳的json資料", dataRes);
    }
    //將信用卡資訊寫入資料庫
    async function addCreditCardToSever(e) {
        let data = {
            member_id: auth.m_id,
            card_number: inputs.number,
            expire_date: inputs.expiry,
        };

        // 連接的伺服器資料網址
        const url = "http://localhost:3700/cart/card/add";

    // 注意資料格式要設定，伺服器才知道是json格式
    // 轉成json檔傳到伺服器
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    // console.log('JSON', JSON.stringify(data))
    // console.log('JSON parse',JSON.parse(JSON.stringify(data)).orderItems)

    const response = await fetch(request)
    const dataRes = await response.json()

    // console.log('伺服器回傳的json資料', dataRes)
  }

    //將房型與活動訂單細節寫入資料庫
    async function addRoomOrderInfoToSever(e) {
        const orderId = +new Date();
        setScOrderId(orderId);

        let data1 = {
            orderDetail: [],
        };

        for (let item of totalCart) {
            const date = new Date();

            const orderInfo = {
                order_id: orderId,
                member_id: auth.m_id,
                order_Type: item.orderType || item.order_type,
                adults: item.adults || item.num_adults,
                kids: item.kids || item.num_children > 1 ? item.kids : 0,
                room_price: item.roomTotalPrice || item.total_price,
                room_id: item.sid,
                room_type_id: item.room_type_id,
                room_folder: item.room_folder,
                room_image: item.room_image,
                room_name: item.room_name,
                perNight: item.perNight,
                start_date: item.startDate || item.start_date,
                end_date: item.endDate || item.end_date,
                act_id: item.actSid,
                act_name: item.actName,
                act_img: item.actImg,
                act_people: item.people,
                act_day: item.date,
                act_price: item.totalPrice || null,
                total_price: discountSum,
                create_at: formatInTimeZone(
                    date,
                    "Asia/Taipei",
                    "yyyy-MM-dd HH:mm:ss "
                ),
            };

            data1.orderDetail.push(orderInfo);
        }
        // console.log(data1);
        // 連接的伺服器資料網址
        const url = "http://localhost:3700/cart/orderDetail/add";

        // 注意資料格式要設定，伺服器才知道是json格式
        // 轉成json檔傳到伺服器
        const request = new Request(url, {
            method: "POST",
            body: JSON.stringify(data1),
            headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json",
            }),
        });
        // console.log("JSON", JSON.stringify(data1));
        // console.log('JSON parse',JSON.parse(JSON.stringify(data)).orderItems)

        const response = await fetch(request);
        const dataRes = await response.json();

        // console.log(orderId);
        // console.log("伺服器回傳的json資料", dataRes);
    }

  const emailSubmit = async () => {
    const res = await axios.post(
      'http://localhost:3700/cart/orderDetail-email',
      orderId
    )

    // console.log(res)
  }

    const HandleAlert = useCallback(() =>{
        Swal.fire({
            imageUrl: "/cart_imgs/5.gif",
            // icon: 'success',
            title: "感謝購買",
            showConfirmButton: false,
            timer: 1500,
        });
    },[Swal])
    const HandleAlertBuy = useCallback(() =>{
        Swal.fire({
            // icon: 'error',
            imageUrl: "/cart_imgs/3.gif",
            title: "錯誤",
            text: "請先將商品加入購物車!",
            showClass: {
                popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutUp",
            },
            timer: 3000,
        });
    },[Swal]);
    const HandleAlertData = useCallback(() =>{
        Swal.fire({
            imageUrl: "/cart_imgs/warning.gif",
            // icon: 'error',
            title: "錯誤",
            text: "有資料沒填喔～!",
            timer: 3000,
        });
    },[Swal])

    // 刪除購物車的商品
  const deleteTemporaryCartAll = async () => {

    const res = await Axios.delete(
        `http://localhost:3700/Booking/deleteTemporaryCartAll?memberId=${auth.m_id}`
    );
    // console.log(res);
};

    // 處理表單送出
    const handleSubmit = (e) => {
        const newErrors = [];
        if (!inputs.number.trim()) {
            newErrors.push("number");
            setErrors(newErrors);
        }
        if (!inputs.name.trim()) {
            newErrors.push("name");
            setErrors(newErrors);
        }
        if (!inputs.expiry.trim()) {
            newErrors.push("expiry");
            setErrors(newErrors);
        }
        if (!inputs.cvc.trim()) {
            newErrors.push("cvc");
            setErrors(newErrors);
        }
        if (newErrors.length !== 0) {
            HandleAlertData();
        }
        // console.log(newErrors);
        if (totalCart && newErrors.length === 0) {
            // 購物車內有商品
            HandleAlert();
            addCreditCardToSever();
            addOrderToSever();
            addRoomOrderInfoToSever();
            pushOrderId();
            // await addActOrderToSever()
            // await emailSubmit()
            setStep(3);
        }
        // if (totalCart.length === 0) {
        //     // 如果購物車內沒有商品的話
        //     HandleAlertBuy();
        //     setStep(1);
        // }

        // clear useContext from useBookingCart
        setBookingCart([]);

        // 把購物車清空
        deleteTemporaryCartAll();
        setActBookingList({...actBookingList,actCount:0})
        // // 把 localStorage 清空
        // localStorage.removeItem('roomItem')
        // localStorage.removeItem('Act')
    };

    useEffect(() => {
        // console.log("progressNames")
    }, [progressNames])
    

    return (
        <>
            <div className="first_component">
                <Process
                    maxSteps={maxSteps}
                    step={step}
                    progressNames={progressNames}
                />
                <BlockComponent
                    setStep={setStep}
                    // roomItem={roomItem}
                    sum={sum}
                    setSum={setSum}
                    actSum={actSum}
                    setactSum={setActSum}
                    setInputs={setInputs}
                    inputs={inputs}
                    handleSubmit={handleSubmit}
                    orderBooking={orderBooking}
                    setOrderBooking={setOrderBooking}
                    HandleAlertBuy={HandleAlertBuy}
                    HandleAlert={HandleAlert}
                    scOrderId={scOrderId}
                    discountSum={discountSum}
                    setdiscountSum={setdiscountSum}
                    orderType1={orderType1}
                    orderType2={orderType2}
                    setOrderActList={setOrderActList}
                    orderActList={orderActList}
                />
            </div>
            {/* {step === 1 ?  <AddOn/> : null} */}
        </>
    );
}

export default CartItem
