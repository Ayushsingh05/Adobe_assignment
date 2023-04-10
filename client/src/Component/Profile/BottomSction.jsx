import React, { useState } from 'react'
import { SinglePost } from './SinglePost';

export const BottomSction = (props) => {
  const [data,setdata] = useState(props)
console.log(typeof(props));
  return (
    <div className='bottomsection'>
      {data && Object.keys(data).length>0 ? Object.values(data).map(el=> <SinglePost key={el._id} {...el} />)  : null}
    </div>
  )
}
