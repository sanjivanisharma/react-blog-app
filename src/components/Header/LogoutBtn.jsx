import { logout } from "../../store/authSlice"
import authService from "../../services/auth"

import { useDispatch } from "react-redux"

export default function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
    .catch(error => console.log(error))
  }

  return (
    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
    >Logout</button>
  )
}
