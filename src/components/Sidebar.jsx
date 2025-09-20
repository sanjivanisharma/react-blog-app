import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { faHome, faUser, faBookmark, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Sidebar({ isOpen, onClose }) {
  const authStatus = useSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile && isOpen) {
      const handleClickOutside = (e) => {
        if (!e.target.closest(".sidebar") && !e.target.closest('[aria-label="Toggle sidebar"]')) {
          onClose()
        }
      }
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [isMobile, isOpen, onClose])

  if (!authStatus) return null

  const sidebarItems = [
    { name: "Home", path: "/", icon: faHome },
    { name: "Profile", path: "/profile", icon: faUser },
    // { name: "Library", path: "/library", icon: faBookmark },
    // { name: "Stats", path: "/stats", icon: faChartLine },
    // { name: "Following", path: "/following", icon: faUsers },
  ]

  const sidebarClasses = `
        sidebar fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transition-transform duration-300 ease-in-out
        ${isMobile ? "w-64" : "w-60"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isMobile ? "shadow-lg" : ""}
    `

  return (
    <>
      {isMobile && isOpen && <div className="fixed inset-0 bg-opacity-50 z-30 top-16" onClick={onClose} />}

      <aside className={sidebarClasses}>
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={isMobile ? onClose : undefined}
                  className={`
                                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                                        ${
                                          location.pathname === item.path
                                            ? "bg-gray-100 text-black font-medium"
                                            : "text-gray-600 hover:text-black hover:bg-gray-50"
                                        }
                                    `}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
