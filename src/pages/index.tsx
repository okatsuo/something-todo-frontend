import { NoSsr } from '@material-ui/core'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import HomeTemplate from '../template/homeTemplate'
import LoginTemplate from '../template/loginTemplate'
import { isLogged } from '../utils/authentication'

interface HomeProps {
  props: {
    isAuthenticatedUser: boolean
  }
}

const Home = ({ props }: HomeProps) => {
  const { isAuthenticatedUser } = props
  return (
    <NoSsr>
      {
        isAuthenticatedUser
          ? <HomeTemplate />
          : <LoginTemplate />
      }
    </NoSsr>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      isAuthenticatedUser: isLogged(ctx)
    }
  }
}

export default Home
