import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Navigation } from './NavigationHOC';
import RegisterUser from '../registeredUsers/RegisterUser';
import LoggedInUser from '../loggedIn/Loggin';
import UsersView from '../users/UsersView';

export default function AppRoutes() {
    const navigate = useNavigate()
    Navigation.navigate = navigate

    return (
        <Routes>
            <Route path='/' element={<RegisterUser />} />
            <Route path='/login' element={<LoggedInUser />} />
            <Route path='/chats' element={<UsersView />} />
        </Routes>
    )
}
