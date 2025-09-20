import { Container, Logo, LogoutBtn } from "../index"

import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { faPenToSquare, faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Header({ onToggleSidebar }) {
  const authStatus = useSelector((state) => state.auth.isAuthenticated)
  const navigate = useNavigate()

  return (
    <header className="site-header border-b border-gray-200 bg-white sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-4">
            {authStatus && (
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Toggle sidebar"
              >
                <FontAwesomeIcon icon={faBars} className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {authStatus ? (
              <>
                <button
                  onClick={() => navigate("/add-post")}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                  Write
                </button>
                <LogoutBtn />
              </>
            ) : (
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 bg-black text-white text-sm rounded-full"
              >
                Get started
              </button>
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}
