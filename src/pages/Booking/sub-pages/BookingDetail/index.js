import React, { useEffect, useState } from 'react'
import RoomCard from './components/RoomCard'
import RoomEquipment from './components/RoomEquipment'
import BookingDetailArea from './components/BookingDetailArea'
import './style/style.scss'
import { useBackground } from '../../../../utils/useBackground'
import DetailPictures from './components/DetailPictures'
import DetailParagraph from './components/DetailParagraph'
import GuessYouLike from './components/GuessYouLike'

import { BK_GET_LIST } from '../../config/ajax-path'
import Axios from 'axios'
import { useBookingList } from '../../../../utils/useBookingList'
// import { useBookingCart } from '../../../../utils/useBookingCart'
import { useAuth } from '../../../Login/sub-pages/AuthProvider'

function Index(props) {
    // 來自useBackground 的設定
    const { setBackground } = useBackground();
    // 進入該頁設定背景
    useEffect(() => {
        setBackground("bg1.svg");
    }, []);
    // useContext 把房間的Sid 帶過來
    const { bookingList, setBookingList } = useBookingList();
    // const { bookingCart, setBookingCart } = useBookingCart();
    const { setAuth, ...auth } = useAuth();

    // 接住來自後端的資料
    const [tagList, setTagList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [picList, setPicList] = useState([]);
    const [eqiList, setEqiList] = useState([]);
    const [otherRoomList, setOtherRoomList] = useState([]);
    const [ruleList, setRuleList] = useState([]);

    // 專門存來自bookingList 和 後端傳回來的roomList
    const [localRoomList, setLocalRoomList] = useState({});

    // 把 room的資料存進去
    const [localRoom, setLocalRoom] = useState({});

    // 先把localStorage 的資料存進 localRoom 裡
    useEffect(() => {
        setLocalRoom(JSON.parse(localStorage.getItem("room")));
    }, []);

    // 拿到localStorage 資料後 發ajax 到後端取值
    useEffect(() => {
        // 如果沒有取到值就 return 掉
        if (Object.keys(localRoom).length === 0) return;
        getData();
    }, [localRoom]);

    // getData 後 取得 roomList 
    useEffect(() => {
        // 如果roomList 有值的話 計算 totalPrice 
        if (roomList.length >= 1) {
            const total =
                roomList[0].room_price * localRoom.perNight +
                localRoom.kids * 200;
                // console.log("total:",total);
            /* ------- bookingList和room 存不存沒差 ------- */
            // 把total 金額存進去bookingList
            setBookingList({ ...bookingList, roomTotalPrice: total });
            // 先把舊localStorage的取出來
            const oldLocalStorage = JSON.parse(localStorage.getItem("room"));
            // 再用解構的方式 加入 totalPrice 
            localStorage.setItem(
                "room",
                JSON.stringify({ ...oldLocalStorage, roomTotalPrice: total })
            );

            /* ------ 這裡才是重點 ------ */
            // 把 localStorge 和 roomList roomTotalPrice 全部存進去localRoomList中
            setLocalRoomList({ ...localRoom, ...roomList[0],roomTotalPrice: total})
        }
        
    }, [roomList]);
    
    

  //   useEffect(() => {
  //       //確認 roomList 有值 才把資料存進去localRoomList
  //   if (roomList.length >= 1) {
  //     setlocalRoomList({ ...localRoom, ...roomList[0] })
  //   }
  // }, [bookingList])



  // 用get 取得所有的值
  const getData = () => {
    // 用 queryString 把 roomSid 傳給後端
    Axios.get(
      `${BK_GET_LIST}/selectRoom?roomSid=${localRoom.roomSid}&personNum=${localRoom.adults}`
    ).then((response) => {
      setRoomList(response.data.roomDetail)
      setTagList(response.data.tagList)
      setPicList(response.data.picList)
      setEqiList(response.data.eqiList)
      setOtherRoomList(response.data.otherRoomList)
      setRuleList(response.data.ruleList)
      // console.log(response.data)
    })
  }

  return (
    <>
      <section className="room_order_detail">
        <div className="room_order_container">
          <div className="room_Rows">
            <div className="room_col_left">
              <RoomCard
                roomList={roomList}
                tagList={tagList}
                picList={picList}
              />
              <RoomEquipment eqiList={eqiList} />
            </div>
            <div className="room_col_right">
              <BookingDetailArea
                roomList={roomList}
                localRoomList={localRoomList}
              />
              
            </div>
          </div>
        </div>
        
      </section>
      <section className="room_detail_up">    
        <DetailPictures picList={picList} />
      </section>
      <section className="room_detail_down">
        <DetailParagraph ruleList={ruleList} />
      </section>
      <section className="guess_you_like">
        <GuessYouLike otherRoomList={otherRoomList} />
      </section>
    </>
  )
}

export default Index
