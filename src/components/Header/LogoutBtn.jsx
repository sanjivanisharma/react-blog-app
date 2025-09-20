import { logout } from "../../store/authSlice"
import { setPostsStore } from "../../store/postSlice"
import authService from "../../services/auth"

import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
      dispatch(setPostsStore({ documents: [] }))
      navigate('/login')
    })
      .catch(error => console.log(error))
  }

  return (
    <button
      className='flex items-center px-2 py-2 text-sm text-gray-600 hover:text-black transition-colors'
      onClick={logoutHandler}
    >Logout</button>
  )
}
