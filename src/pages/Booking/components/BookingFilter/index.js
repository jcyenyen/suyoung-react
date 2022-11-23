
import RoomFilterMobile from './components/RoomFilterMobile'
import RoomFilterRoomType from './components/RoomFilterRoomType'
import RoomFilterRoomSelect from './components/RoomFilterRoomSelect'
import RoomFilterPrice from './components/RoomFilterPrice'
import RoomFilterTag from './components/RoomFilterTag'
import RoomFilterPeopleSay from './components/RoomFilterPeopleSay'
import RoomFilterQuick from "./components/RoomFilterQuick";

import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import { BK_GET_LIST } from "../../config/ajax-path";
import { useBookingList } from "../../../../utils/useBookingList";

function Index(props) {

    // 全部的篩選控制器
    const {searchName, setSearchName, checkroomType, setCheckRoomType, roomSelector, setRoomSelector, value, setValue, tagValue, setTagValue, recommend, setRecommend, popular, setPopular, setSearchContext, searchContext, checkPrice, setCheckPrice} = props;
    /* ------ useContext 的值 ------ */
    const { bookingList, setBookingList } = useBookingList();

    /* ------ 來自後端的資料存在這 ------ */ 
    // 所有標籤列表 
    const [tagList, setTagList] = useState([]);

    // 所有房間列表
    const [roomList, setRoomList] = useState([]);


    /* ------ 監控所有篩選按鍵的狀態 ------ */

    // // 房型確認狀態
    // const [checkroomType, setCheckRoomType] = useState([]);

    // // 檢查房間狀態
    // const [roomSelector, setRoomSelector] = useState([]);

    // // 檢查價格狀態
    // const [value, setValue] = useState([1000, 5000]);

    // // 檢查標籤狀態
    // const [tagValue, setTagValue] = useState([]);

    // // 檢查大家怎麼說狀態
    // const [recommend, setRecommend] = useState(false);
    // const [popular, setPopular] = useState(false);


    /* ------ 從後端取值 ------*/
    const getTagData = () => {
        Axios.get(`${BK_GET_LIST}/selectTag`).then((response) => {
            setTagList(response.data);
            // console.log(response.data);
        });
    };
    const getData = async () => {
        await Axios.get(`${BK_GET_LIST}/selectRoom`).then((response) => {
            // setRoomList(response.data.roomList);
            const roomList = response.data.roomList;
            // // 製作一個陣列 只取 room_name
            // const newRoomList = roomList.map((v) => v.room_name);
            setRoomList(roomList);
        });
    };

    /* 進來頁面 就先跟後端取值 */
    useEffect(() => {
        // 拿所有標籤
        getTagData();
        // 拿所有房間
        getData();
    }, []);

    /* 若從別的網頁有用 useContext 帶值過來 優先存進去 roomSelector中 */
    useEffect(() => {
        if(bookingList.roomSelector.length !== 0){
            setRoomSelector(bookingList.roomSelector);
        }
    }, [bookingList])
    return (
    <>
        <div className="room_filter_container">
            <div className="room_filter_area">
                <div className="room_filter_btn">
                    <RoomFilterMobile checkroomType={checkroomType} setCheckRoomType={setCheckRoomType} roomSelector={roomSelector} setRoomSelector={setRoomSelector} value={value} setValue={setValue} tagValue={tagValue} setTagValue={setTagValue} recommend={recommend} setRecommend={setRecommend} popular={popular} setPopular={setPopular} roomList={roomList} tagList={tagList} checkPrice={checkPrice} setCheckPrice={setCheckPrice}/>
                </div>
                <div className='room_filter_quick'>
                    <RoomFilterQuick searchName={searchName} setSearchName={setSearchName} setSearchContext={setSearchContext} searchContext={searchContext} checkPrice={checkPrice} setCheckPrice={setCheckPrice} />
                </div>
                <div className="room_filter_roomType">
                    <RoomFilterRoomType checkroomType={checkroomType} setCheckRoomType={setCheckRoomType}/>
                </div>
                <div className="room_filter_roomSelect">
                    <RoomFilterRoomSelect roomSelector={roomSelector} setRoomSelector={setRoomSelector} roomList={roomList}/>
                </div>
                <div className="room_filter_price">
                    <RoomFilterPrice value={value} setValue={setValue}/>
                </div>
                <div className="room_filter_tag">
                    <RoomFilterTag tagValue={tagValue} setTagValue={setTagValue} tagList={tagList}/>
                </div>
                <div className="room_filter_people_say">
                    <RoomFilterPeopleSay recommend={recommend} setRecommend={setRecommend} popular={popular} setPopular={setPopular} />
                </div>
            </div>
        </div>
    </>
  )
}

export default Index
