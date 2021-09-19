import { useQuery } from '@apollo/client'
import { Box, Container, InputAdornment, List, ListItem, ListItemText } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import React, { KeyboardEvent, useEffect, useState } from 'react'
import { initializeApollo } from '../../../graphql/client'
import { CREATE_TODO } from '../../../graphql/mutations/createTodo'
import { REMOVE_TODO } from '../../../graphql/mutations/removeTodo'
import { UPDATE_TODO } from '../../../graphql/mutations/updateTodo'
import { USER_TODO } from '../../../graphql/queries/userTodos'
import { UserLoggedInfo } from '../../../utils/user-account-stuff'
import { Hr } from '../../basics/hr'
import { InputAddTodo } from '../addTodo'
import { TodoCheckbox } from '../checkboxTodo'
import DeleteTodo from '../removeTodo'
import * as Styles from './styles'

const Todo = () => {
  const apolloClient = initializeApollo()
  const [newTodo, setNewTodo] = useState('')
  const [userTodos, setUserTodo] = useState<any[]>([])
  const userLogged = UserLoggedInfo()
  const { data: userTodo, loading } = useQuery(USER_TODO, {
    variables: { user_id: userLogged?.id }
  })

  useEffect(() => {
    if (userTodo) {
      setUserTodo(userTodo.loadTodo)
    }
  }, [userTodo])

  const handleRegisterTodo = async () => {
    if (!newTodo) return
    const todo = {
      name: newTodo,
      description: '',
      active: true,
      user_id: userLogged?.id
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

  const handleRemoveTodo = async (id: string) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: REMOVE_TODO,
        variables: { id }
      })
      if (data.removeTodo) {
        setUserTodo(userTodos.filter((todo: any) => todo.id !== id))
      }
    } catch (error) {
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

  const handleKeyboardEvent = async ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      await handleRegisterTodo()
    }
  }

  return (
    <Styles.Wrapper>
      <Container maxWidth='md'>
        <Styles.Content>
          <Box m={3} justifyContent='center' alignItems='center' display='flex' flexDirection='row'>
            <InputAddTodo
              variant='filled'
              label='adicionar uma nova tarefa'
              style={{ paddingRight: '15px' }}
              fullWidth
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
              onKeyPress={async (key) => await handleKeyboardEvent(key)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div onClick={async () => await handleRegisterTodo()} style={{ cursor: 'pointer' }}>
                      <AddCircle accentHeight='20px' />
                    </div>
                  </InputAdornment>
                ),
                disableUnderline: true
              }}
            />
          </Box>
          <List component="nav" aria-label="mailbox folders">
            {!loading &&
              userTodos.map((todo: any) =>
                <div key={todo.id}>
                  <ListItem button key={todo.id}>

                    <ListItemText
                      primary={
                        <span onClick={async () => await handleUpdateTodo(todo)}>
                          <TodoCheckbox checked={!todo.active} text={todo.name}/>
                        </span>
                      }
                    />
                    <DeleteTodo onClick={async () => await handleRemoveTodo(todo.id)} />
                  </ListItem>
                  <Hr />
                </div>
              )}
          </List>
        </Styles.Content>
      </Container>
    </Styles.Wrapper>
  )
}

export default Todo
