import { NoSsr } from '@material-ui/core'
import HomeTemplate from '../template/homeTemplate'
import LoginTemplate from '../template/loginTemplate'
import isLogged from '../utils/authentication'

const Home = (props: any) => {
  const { isAuthenticatedUser } = props
  return (
  <NoSsr>
    {isAuthenticatedUser
      ? <HomeTemplate />
      : <LoginTemplate/>
    }
  </NoSsr>)
}

export const getServerSideProps = async (ctx: any) => {
  return {
    props: {
      isAuthenticatedUser: isLogged(ctx)
    }
  }
}

export default Home
