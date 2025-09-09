import { useState, useEffect } from "react"

import "./App.css"
import { Footer, Header } from "./components"
import authService from "./services/auth"
import { login, logout } from "./store/authSlice"

import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((account) => {
        if (account) {
          dispatch(login({ userData: account }))
        } else {
          dispatch(logout())
        }
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-300'>
      <div className='w-full flex flex-col min-h-screen'>
        <Header />
        <main className="h-full flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}