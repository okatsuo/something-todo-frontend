import { useMutation } from '@apollo/client'
import React from 'react'
import { apolloClient } from '../../../graphql/client'
import { REMOVE_TODO } from '../../../graphql/mutations/removeTodo'
import { UPDATE_TODO } from '../../../graphql/mutations/updateTodo'
import { USER_TODO } from '../../../graphql/queries/userTodos'
import { UserLoggedInfo } from '../../../utils/authentication'
import { Hr } from '../../basics/hr'
import { TodoCheckbox } from '../checkboxTodo'
import DeleteTodo from '../removeTodo'
import * as Styles from './styles'

interface ListTodoProps {
  userTodos: any[]
}

const ListTodo = (props: ListTodoProps) => {
  const { userTodos } = props
  const [removeTodo] = useMutation(REMOVE_TODO)

  const handleRemoveTodo = async (id: number) => {
    try {
      await removeTodo({
        variables: { id },
        update: (cache, { data: { removeTodo } }) => {
          if (removeTodo === false) return
          const userLogged = UserLoggedInfo()
          const variables = { user_id: userLogged?.id }
          const { loadTodo } = apolloClient.readQuery({ query: USER_TODO, variables })
          cache.writeQuery({
            query: USER_TODO,
            data: {
              loadTodo: [...loadTodo.filter((todo: any) => todo.id !== id)]
            },
            variables
          })
        }
      })
    } catch (error) {
      console.error('problema com a remoção da tarefa')
    }
  }

  const handleUpdateTodo = async (fields: any) => {
    const dataToUpdate = {
      id: fields.id,
      fields: {
        active: !fields.active
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
                <span onClick={ async () => await handleUpdateTodo(todo)} >
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
