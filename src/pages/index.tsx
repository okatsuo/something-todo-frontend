import type { NextPage } from 'next'
import Header from '../components/header'
import isLogged from '../utils/authentication'

const Home: NextPage = (props) => {
  return (
    <Header />
  )
}

export const getServerSideProps = async (context: any) => {
  if (!isLogged(context)) {
    return {
      redirect: { destination: '/login', permanent: false }
    }
  }
  return {
    props: {}
  }
}

export default Home
