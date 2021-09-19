import { useQuery } from '@apollo/client'
import { Box, Container, List } from '@material-ui/core'
import React, { KeyboardEvent, useEffect, useState } from 'react'
import { initializeApollo } from '../../graphql/client'
import { CREATE_TODO } from '../../graphql/mutations/createTodo'
import { USER_TODO } from '../../graphql/queries/userTodos'
import { UserLoggedInfo } from '../../utils/user-account-stuff'
import AddTodo from './addTodo'
import ListTodo from './listTodo'
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
            <AddTodo
              handleKeyboardEvent={handleKeyboardEvent}
              handleRegisterTodo={handleRegisterTodo}
              setNewTodo={setNewTodo}
              value={newTodo}
            />
          </Box>
          <List>
            {!loading &&
              <ListTodo
                setUserTodo={setUserTodo}
                userTodos={userTodos}
              />
            }
          </List>
        </Styles.Content>
      </Container>
    </Styles.Wrapper>
  )
}

export default Todo
