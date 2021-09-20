import { parseCookies, destroyCookie } from 'nookies'

import { jwtDecode, jwtVerify } from '../JWT'

export const isLogged = (context: any) => {
  const hasToken = (parseCookies(context)).t_user
  if (!hasToken) return false
  const isValid = jwtVerify(hasToken)
  return isValid
}

export const UserLoggedInfo = (context?: any) => {
  const userCookies = (parseCookies(context)).t_user
  const userInfo = jwtDecode(userCookies)
  return userInfo
}

export const UserLogout = () => {
  destroyCookie(null, 't_user')
}
