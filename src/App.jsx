import { useState, useEffect } from "react"

import "./App.css"
import { Header, Sidebar } from "./components"
import authService from "./services/auth"
import { login, logout } from "./store/authSlice"

import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

export default function App() {
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.isAuthenticated)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((account) => {
        if (account) {
          dispatch(login({ userData: account }))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    if (!authStatus) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [authStatus])

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className={`flex-1 transition-all duration-300 ${authStatus && sidebarOpen ? "md:ml-60" : ""}`}>
        <Outlet />
      </main>
    </div>
  )
}
