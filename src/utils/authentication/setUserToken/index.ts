import { parseCookies, setCookie } from 'nookies'
import { UserLogout } from '..'

interface setUserTokenProps {
  maxAge: number
  value: any
}

export const setUserToken = (values: setUserTokenProps) => {
  const { maxAge, value } = values
  const token = (parseCookies()).t_user
  if (token) UserLogout()
  setCookie(null, 't_user', value, {
    maxAge,
    path: '/'
  })
}
