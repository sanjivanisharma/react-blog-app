import { useState, useEffect } from "react"

import "./App.css"
import { Footer, Header } from "./components"
import authService from "./services/auth"
import { login, logout } from "./store/authSlice"

import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { ClipLoader } from "react-spinners"

export default function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const loaderStyle = {
    display: "block",
    margin: "0 auto"
  }

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
      .finally(setLoading(false))
  }, [])

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full flex flex-col min-h-screen'>
        <Header />
        <main className="h-full flex-grow">
          {loading ? (
            <ClipLoader
              loading={loading}
              cssOverride={loaderStyle}
              size={100}
              aria-label="Loading Spinner"
            />) : <Outlet />}
        </main>
        <Footer />
      </div>
    </div>
  )
}