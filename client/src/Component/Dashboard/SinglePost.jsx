import React, { useContext, useEffect, useState } from 'react'
import { SlOptions } from "react-icons/sl";
import { BsFillHeartFill, BsHeart, BsFillSendFill, BsSaveFill } from 'react-icons/bs';
import { MdOutlineInsertComment } from "react-icons/md"
import axios from 'axios';
import { appContext } from './../../Context/AppContext';
import { useToast } from '@chakra-ui/react';

export const SinglePost = (props) => {

    const toast = useToast();
    const {loggedIn} = useContext(appContext);
    const [likeArray,setLikeArray]= useState(props.data.like_data)
    const[isLike,setIsLike] = useState(false);
    const {user_id, image, likes , heading, content, _id} = props.data;
    const [like,setlike]= useState(likes);
    const likePost = async () =>{
        if(loggedIn){
            await axios.post(`https://adobe-assignment-liard.vercel.app/posts/${_id}/like`,{userId:loggedIn._id}).then((res)=>{
                setLikeArray(res.data.like_data);
                setlike(like+1)
                checklike();
            })

        }else{
            toast({
                title: 'Login Error',
                position: "top",
                description: "Login first",
                status: 'error',
                duration: 1000,
                isClosable: true,
              })
        }
    }
    const unlikePost = async ()=>{
        if(loggedIn){
            await axios.post(`https://adobe-assignment-liard.vercel.app/posts/${_id}/unlike`,{userId:loggedIn._id}).then((res)=>{
                setLikeArray(res.data.like_data);
                setlike(like-1)
                checklike();
            })
        }
        else{
            toast({
                title: 'Login Error',
                position: "top",
                description: "Login first",
                status: 'error',
                duration: 1000,
                isClosable: true,
              })
        }

    }
    const checklike=()=>{
        if(likeArray && loggedIn ){

            const exist = likeArray.filter(el => el === loggedIn._id);
            if(exist.length>0){
                setIsLike(true)
            }
            else{
                setIsLike(false);
            }
        }
    }
    // console.log(isLike);
    useEffect(()=>{
        checklike();
    },[likeArray])
    return (
        <div>
            <div className="post">
                <div className="info">
                    <div className="user">
                        <div className="profile-pic"><img src={user_id.profile_pic} alt="" /></div>
                        <p className="username">{user_id.name} </p>
                    </div>
                    <SlOptions className="icon" />
                </div>
                <img src={image} className="post-image" alt="" />
                <div className="post-content">
                    <div className="reaction-wrapper">
                        {
                             isLike?
                             <BsFillHeartFill className="icon" onClick={unlikePost} />
                               
                                : <BsHeart className="icon" onClick={likePost} />
                        }

                        <MdOutlineInsertComment className="icon" />
                        <BsFillSendFill className="icon" />
                        <BsSaveFill className="save icon" />
                    </div>
                    <p className="likes">{like}</p>
                    <p className="description"><span>{heading} </span> {content}</p>
                </div>
            </div>
        </div>
    )
}
