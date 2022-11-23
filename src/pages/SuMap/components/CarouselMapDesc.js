import React, { Fragment } from 'react'
import data from './Content.json'

const CarouselMapDesc = (props) => {
  const mapData = [...data]
  const {setStep} = props;
  const { title, content } = mapData[props.step]

  return (
    <Fragment>
      <h2>{title}</h2>
      <br />
      <p>{content}</p>
      <div>
        <br />
        <button className='seemore_map' onClick={()=>{setStep(1)}}>點擊查看更多</button>
      </div>
    </Fragment>
  )

  // return (
  //   <>
  //     {/* <h2>頂級網美區</h2>
  //      */}

  //     {mapData[props.step].map((v, i) => {
  //       return (
  //         <Fragment key={v.id}>
  //           <h2>{v.title}</h2>
  //           <br />
  //           <p>{v.content}</p>
  //           <div>
  //             <br />
  //             <button className='seemore_map'>點擊查看更多</button>
  //           </div>
  //         </Fragment>
  //       )
  //     })}
  //   </>
  // )
}

export default CarouselMapDesc
