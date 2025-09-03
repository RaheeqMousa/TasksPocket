import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Tasks from './Pages/Tasks/Tasks'
import Profile from './Pages/Profile/Profile'
import LoggedInProtectedRouter from './Components/LoggedInProtectedRoute/LoggedInProtectedRouter'
import AuthProtectedRoute from './Components/AuthProtectedRoute.jsx/AuthProtectedRoute'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />

            <Route element={<LoggedInProtectedRouter />}>
              <Route path="auth/login" element={<Login />} />
              <Route path="auth/register" element={<Register />} />
            </Route>

            <Route element={<AuthProtectedRoute />}>
              <Route path="user/tasks" element={<Tasks />} />
              <Route path="user/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
