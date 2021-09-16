import type { NextPage } from 'next'
import HomeTemplate from '../template/homeTemplate'
import isLogged from '../utils/authentication'

const Home: NextPage = () => {
  return (
    <HomeTemplate />
  )
}

export const getServerSideProps = async (ctx: any) => {
  if (!isLogged(ctx)) {
    return {
      redirect: { destination: '/login', permanent: false }
    }
  }

  return {
    props: {

    }
  }
}

export default Home
