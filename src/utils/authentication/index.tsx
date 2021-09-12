import { parseCookies } from 'nookies'

const isLogged = (context: any) => {
  const hasToken = (parseCookies(context)).t_user
  const isAuthenticate = !!hasToken
  return isAuthenticate
}

export default isLogged
