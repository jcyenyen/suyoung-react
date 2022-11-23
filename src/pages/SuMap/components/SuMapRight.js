import React, { useEffect, useState } from 'react'
 
const SuMapRight = (props) => {
  const [state, setState] = useState('')

  const { modalOpen } = props

  useEffect(()=>{

    document.getElementById('img1').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(0)  
      }, );
         
    } )

  },[])

  useEffect(()=>{

    document.getElementById('img2').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(5)  
      }, );
         
    } )

  },[])
  useEffect(()=>{

    document.getElementById('img3').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(3)  
      }, );
         
    } )
  },[])
  useEffect(()=>{

    document.getElementById('img4').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(3)  
      }, );
         
    } )

  },[])
  useEffect(()=>{

    document.getElementById('img5').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(2)  
      }, );
         
    } )

  },[])
  useEffect(()=>{

    document.getElementById('img9').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(2)  
      }, );
         
    } )

  },[])
  useEffect(()=>{

    document.getElementById('img10').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(2)  
      }, );
         
    } )

  },[])
  useEffect(()=>{

    document.getElementById('img6').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(1)  
      }, );
         
    } )
  },[])
  useEffect(()=>{

    document.getElementById('img7').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(1)  
      }, );
         
    } )
  },[])
  useEffect(()=>{

    document.getElementById('img8').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(1)  
      }, );
         
    } )
    

  },[])
  useEffect(()=>{

    document.getElementById('img11').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(4)  
      }, );
         
    } )
    

  },[])
  useEffect(()=>{

    document.getElementById('img12').addEventListener('click', function (e) {
      setTimeout(() => {
        modalOpen(4)  
      }, );
         
    } )
    

  },[])

  return (
    <>
    <div className='map_base'>
      <div className='yingbenbu_box' >
      {/* <a href="https://blog.csdn.net/yz18931904/article/details/80482166"> */}
        <img className='yingbenbu'  id="img1" src="http://localhost:3777/map_imgs/yingbenbu.png" alt=""/>
        {/* </a> */}
        
      </div>
      <div>
      <img className='xingkong' id="img2" src="http://localhost:3777/map_imgs/xingkong.png" alt="" />
      </div>
      <div>
        <img className='qingzi1' id="img3" src="http://localhost:3777/map_imgs/qingzi1.png" alt="" />
      </div>
      <div>
        <img className='qingzi2' id="img4" src="http://localhost:3777/map_imgs/qingzi2.png" alt="" />
      </div>
      <div>
      <img className='buqiuren' id="img5" src="http://localhost:3777/map_imgs/buqiuren.png" alt="" />
      </div>
      <div>
      <img className='buqiuren2' id="img9" src="http://localhost:3777/map_imgs/buqiuren2.png" alt="" />
      </div>
      <div>
      <img className='buqiuren3' id="img10" src="http://localhost:3777/map_imgs/buqiuren3.png" alt="" />
      </div>
      <div>
        <img className='wangmei1' id="img6" src="http://localhost:3777/map_imgs/wangmei1.png" alt="" />
      </div>
      <div>
        <img className='wangmei2' id="img7" src="http://localhost:3777/map_imgs/wangmei2.png" alt="" />
      </div>
      <div>
        <img className='wangmei3' id="img8" src="http://localhost:3777/map_imgs/wangmei3.png" alt="" />
      </div>
      <div>
        <img className='luyingche1' id="img11" src="http://localhost:3777/map_imgs/luyingche1.png" alt="" />
      </div>
      <div>
        <img className='luyingche2' id="img12" src="http://localhost:3777/map_imgs/luyingche2.png" alt="" />
      </div>
      </div>
      </>
  )
}

export default SuMapRight