import React, { useEffect, useState } from 'react'
import { SinglePost } from './SinglePost'
import axios from 'axios'
export const Posts = () => {
  const [posts,setPosts] = useState();
  const getPosts = async () =>{
    await axios.get('https://adobe-assignment-liard.vercel.app/posts').then((res)=>{
      setPosts(res.data)
    }).catch((e)=>{
      console.log(e);
    })
  }
  useEffect(()=>{
    getPosts();
  },[])
  return (
    <div className='posts'>
      {
        posts? 
        posts.map(el => <SinglePost key={el._id} data={el} />)
        : null
      }
    </div>
  )
}
