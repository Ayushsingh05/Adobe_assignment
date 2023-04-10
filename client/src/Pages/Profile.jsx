import React, { useEffect, useState } from 'react'
import { TopSection } from '../Component/Profile/TopSection'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BottomSction } from '../Component/Profile/BottomSction'
export const Profile = () => {
  const [data,setData] = useState();
  const {id} = useParams();
  const fetchProfile = async () =>{
    await axios.get(`https://adobe-assignment-liard.vercel.app/users/${id}`).then((res)=>{
      // console.log(res.data)
      setData(res.data)
    })
  }
 useEffect(()=>{
  fetchProfile();
 },[])
  return (
    <div  className="profilePage" >
      {data ?<>
      <TopSection {...data.user} /> 
      <BottomSction {...data.posts} />
      </>
      : null}
    </div>
  )
}
