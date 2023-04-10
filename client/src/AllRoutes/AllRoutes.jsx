import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../Pages/Dashboard'
import { Login } from '../Pages/Login'
import Navbar from './../Component/Navbar/Navbar';
import { Analytics } from '../Pages/Analytics';
import { CreatePost } from '../Pages/CreatePost';
import { Profile } from '../Pages/Profile';

export const AllRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Dashboard />} />
                <Route exact path='/analytics' element={<Analytics/>} />
                <Route exact path='/post' element={<CreatePost/>} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path='/profile/:id' element={<Profile/>} />
            </Routes>
        </>
    )
}
