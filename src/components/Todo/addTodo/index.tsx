import { InputAdornment } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import React from 'react'
import { initializeApollo } from '../../../graphql/client'
import { CREATE_TODO } from '../../../graphql/mutations/createTodo'
import * as Styles from './styles'

interface AddTodoProps {
  newTodo: string
  userId: string
  userTodos: any[]
  setNewTodo: (value: string) => void
  setUserTodo: (values: any[]) => void
}

const AddTodo = (props: AddTodoProps) => {
  const { setNewTodo, setUserTodo, newTodo, userId, userTodos } = props

  const apolloClient = initializeApollo()

  const handleRegisterTodo = async () => {
    if (!newTodo) return
    const todo = {
      name: newTodo,
      description: '',
      active: true,
      user_id: userId
    }
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_TODO,
        variables: todo
      })
      setNewTodo('')
      const { todoCreate } = data
      setUserTodo([...userTodos, todoCreate])
    } catch (error) {
      console.error('deu erro...', error)
    }
  }

  return (
    <Styles.InputAddTodo
      onKeyPress={async (target) => target.key === 'Enter' ? await handleRegisterTodo() : null}
      onChange={(event) => setNewTodo(event.target.value)}
      label='adicionar uma nova tarefa'
      style={{ paddingRight: '15px' }}
      variant='filled'
      value={newTodo}
      fullWidth
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
