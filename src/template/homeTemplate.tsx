import Header from '../components/header'
import Todo from '../components/Todo/listTodo'

const HomeTemplate = ({ data }: any) => {
  return (
    <>
      <Header />
      <Todo userTodo={data.userTodo} />
    </>
  )
}

export default HomeTemplate
