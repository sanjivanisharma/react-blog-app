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
      navigate('/')
    })
      .catch(error => console.log(error))
  }

  return (
    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-gray-300 hover:text-gray-950 rounded-full cursor-pointer'
      onClick={logoutHandler}
    >Logout</button>
  )
}
