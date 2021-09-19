import { parseCookies, destroyCookie } from 'nookies'

import { jwtDecode } from '../JWT'

export const isLogged = (context: any) => {
  const hasToken = (parseCookies(context)).t_user
  const isAuthenticate = !!hasToken
  return isAuthenticate
}

export const UserLoggedInfo = (context?: any) => {
  const userCookies = (parseCookies(context)).t_user
  const userInfo = jwtDecode(userCookies)
  return userInfo
}

export const UserLogout = () => {
  destroyCookie(null, 't_user')
}
