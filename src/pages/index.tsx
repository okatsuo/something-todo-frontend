import type { NextPage } from 'next'
import { initializeApollo } from '../graphql/client'
import { USER_TODO } from '../graphql/queries/userTodos'
import HomeTemplate from '../template/homeTemplate'
import isLogged from '../utils/authentication'
import { UserLoggedInfo } from '../utils/user-account-stuff'

const Home: NextPage = (props) => {
  return (
    <HomeTemplate data={props}/>
  )
}

export const getServerSideProps = async (ctx: any) => {
  if (!isLogged(ctx)) {
    return {
      redirect: { destination: '/login', permanent: false }
    }
  }
  const apolloClient = initializeApollo()
  const userCookies = UserLoggedInfo(ctx)

  const { data: userTodo } = await apolloClient.query({
    query: USER_TODO,
    variables: { user_id: userCookies?.id }
  })
  return {
    props: {
      userTodo: userTodo.loadTodo.length ? userTodo.loadTodo : []
    }
  }
}

export default Home
