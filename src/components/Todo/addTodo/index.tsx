import { useMutation } from '@apollo/client'
import { InputAdornment } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import React from 'react'
import { apolloClient } from '../../../graphql/client'
import { CREATE_TODO } from '../../../graphql/mutations/createTodo'
import { USER_TODO } from '../../../graphql/queries/userTodos'
import { UserLoggedInfo } from '../../../utils/authentication'
import * as Styles from './styles'

interface AddTodoProps {
  newTodo: string
  userId: string
  setNewTodo: (value: string) => void
}

const buildTodo = (newTodo: string, userId: string) => ({
  name: newTodo,
  description: '',
  user_id: userId
})

const AddTodo = (props: AddTodoProps) => {
  const { setNewTodo, newTodo, userId } = props
  const [createTodo] = useMutation(CREATE_TODO)

  const handleRegisterTodo = async () => {
    if (!newTodo) return

    const todo = buildTodo(newTodo, userId)
    try {
      const userLogged = UserLoggedInfo()
      await createTodo({
        variables: todo,
        update: (cache, { data: { todoCreate } }) => {
          const { loadTodo } = apolloClient.readQuery({ query: USER_TODO, variables: { user_id: userLogged?.id } })
          cache.writeQuery({
            query: USER_TODO,
            data: {
              loadTodo: [
                todoCreate,
                ...loadTodo
              ]
            },
            variables: { user_id: userLogged?.id }
          })
        }
      })
    } catch (error) {
      console.error('deu erro...', error)
    }
  }

  return (
    <Styles.InputAddTodo
      onKeyPress={async (target) => target.key === 'Enter' ? await handleRegisterTodo() : null}
      onChange={(event) => setNewTodo(event.target.value)}
      label='adicionar uma nova tarefa'
      variant='filled'
      value={newTodo}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <div onClick={handleRegisterTodo} style={{ cursor: 'pointer' }}>
              <AddCircle accentHeight='20px' />
            </div>
          </InputAdornment>
        ),
        disableUnderline: true
      }}
    />
  )
}

export default AddTodo
