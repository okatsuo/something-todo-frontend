import { destroyCookie, parseCookies } from 'nookies'
import { jwtDecode } from '../JWT'

export const UserLoggedInfo = () => {
  const userCookies = (parseCookies()).t_user
  const userInfo = jwtDecode(userCookies)
  return userInfo
}

export const UserLogout = () => {
  destroyCookie(null, 't_user')
}
