import React, { useEffect, useState } from 'react'
import './anlytics.css'
import { SinglePost } from '../Dashboard/SinglePost'
import axios from 'axios'
import { SingleUser } from './SingleUser'
export const AllUsers = () => {
    const [totalUser, setTotalUser] = useState({count:0});
    const [activeUsers, setaciveUsers] =  useState();
    const [posts, setPosts] = useState();
    const getPosts = async () => {
        try {
            const data = await axios.get('http://localhost:8080/posts/analytics/top-liked');
            setPosts(data.data);
        } catch (e) {
            console.log(e)
        }
    }
    const getTotalUsersCount =async ()=>{
        try {
            const data = await axios.get('http://localhost:8080/analytics/users');
            setTotalUser(data.data);
        } catch (e) {
            console.log(e)
        }
    }
    
   const getTopActiveUsers = async ()=>{
    try {
        const data = await axios.get('http://localhost:8080/analytics/users/top-active');
        setaciveUsers(data.data);
    } catch (e) {
        console.log(e)
    }
   }

    useEffect(() => {
        getPosts();
        getTotalUsersCount();
        getTopActiveUsers();
    }, [])
    return (
        <div className="all-users">
            <h3>
                Total Existing User is {totalUser.count}
            </h3>
            <div className='top_user_post_container'>
                <div className="top-posts">
                    <h4>
                        List of Top Liked Posts
                    </h4>
                    {posts && posts.length > 0 ? posts.map(el => <SinglePost key={el._id} data={el} />) : null}
                </div>
                <div className="top-users">
                    <h4>
                        List of Top  Active users
                    </h4>
                    <div className="user-list">
                        {activeUsers && activeUsers.length>0  ? activeUsers.map(el => <SingleUser/> )  : null} 
                    </div>
                </div>
            </div>
        </div>
    )
}
