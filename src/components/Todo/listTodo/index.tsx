import React from 'react'
import { initializeApollo } from '../../../graphql/client'
import { REMOVE_TODO } from '../../../graphql/mutations/removeTodo'
import { UPDATE_TODO } from '../../../graphql/mutations/updateTodo'
import { Hr } from '../../basics/hr'
import { TodoCheckbox } from '../checkboxTodo'
import DeleteTodo from '../removeTodo'
import * as Styles from './styles'

interface ListTodoProps {
  userTodos: any[]
  setUserTodo: (values: any[]) => void
}

const ListTodo = (props: ListTodoProps) => {
  const { userTodos, setUserTodo } = props

  const apolloClient = initializeApollo()

  const handleRemoveTodo = async (id: number) => {
    console.log(id)
    try {
      const { data } = await apolloClient.mutate({
        mutation: REMOVE_TODO,
        variables: { id }
      })
      if (data.removeTodo) {
        setUserTodo(userTodos.filter((todo: any) => todo.id !== id))
      }
    } catch (error) {
      console.error('problema com a remoção da tarefa')
    }
  }

  const handleUpdateTodo = async (fields: any) => {
    const dataToUpdate = {
      todo_id: fields.id,
      fields: {
        name: fields.name,
        user_id: fields.user_id,
        active: !fields.active,
        description: fields.description
      }
    }
    try {
      await apolloClient.mutate({
        mutation: UPDATE_TODO,
        variables: dataToUpdate
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      {userTodos.map((todo: any) =>
        <div key={todo.id}>
          <Styles.ListItem button key={todo.id}>

            <Styles.ListItemText
              primary={
                <span onClick={async () => await handleUpdateTodo(todo)} >
                  <TodoCheckbox checked={!todo.active} text={todo.name} />
                </span>
              }
            />
            <DeleteTodo onClick={async () => await handleRemoveTodo(todo.id)} />
          </Styles.ListItem>
          <Hr />
        </div>
      )}
    </>
  )
}

export default ListTodo
