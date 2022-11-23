import React from 'react'
import'../styles/ProgressBar.scss';


function Process(props) {
    const { maxSteps, step, progressNames } = props
  return (
        <ul className='p-cart_step'>
          {Array(maxSteps)
            .fill(1)
            .map((v, i) => {
              return (
                <li key={i} className={i +1 <= step ? 'active p-cart_step_item ' : 'p-cart_step_item  nonactive1'}>
                  {progressNames[i]}
                </li>
              )
            })}
        </ul>
  )
}


export default Process
