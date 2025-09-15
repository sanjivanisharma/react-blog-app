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
      dispatch(setPostsStore({documents: []}))
      navigate('/login')
    })
      .catch(error => console.log(error))
  }

  return (
    <button
      className='inline-block px-3 py-2 md:px-6 duration-200 hover:bg-gray-300 hover:text-gray-950 rounded-full cursor-pointer text-sm md:text-base'
      onClick={logoutHandler}
    >Logout</button>
  )
}
