import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes,Route, Router } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Tasks from './Pages/Tasks/Tasks'
import Profile from './Pages/Profile/Profile'
import LoggedInProtectedRouter from './Components/LoggedInProtectedRoute/LoggedInProtectedRouter'
import AuthProtectedRoute from './Components/AuthProtectedRoute.jsx/AuthProtectedRoute'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './Context/UserContextProvider'
import UpdateUsername from './Pages/Profile/UpdateUsername'
import ResetPassword from './Pages/Profile/ResetPassword'
import ProfileInfo from './Pages/Profile/ProfileInfo'

function App() {

  return (
    <>
      <BrowserRouter>
        <UserContextProvider >
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />

              <Route element={<LoggedInProtectedRouter />}>
                <Route path="auth/login" element={<Login />} />
                <Route path="auth/register" element={<Register />} />
              </Route>

              <Route element={<AuthProtectedRoute />}>
                  <Route path="user/tasks" element={<Tasks />} />
                  <Route path="user/profile/" element={<Profile />} >
                    <Route path='ProfileInfo' element={<ProfileInfo />}/>
                    <Route path='UpdateUsername' element={<UpdateUsername />}/>
                  </Route>
              </Route>
            </Route>

          </Routes>
          </UserContextProvider >
      </BrowserRouter>
    </>
  )
}

export default App
