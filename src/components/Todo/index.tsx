
import { USER_TODO } from '../../graphql/queries/userTodos'
import { Box, Container, List } from '@material-ui/core'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import * as Styles from './styles'
import ListTodo from './listTodo'
import AddTodo from './addTodo'
import { UserLoggedInfo } from '../../utils/authentication'

const Todo = () => {
  const [newTodo, setNewTodo] = useState('')
  const userLogged = UserLoggedInfo()
  const { data, loading } = useQuery(USER_TODO, {
    variables: { user_id: userLogged?.id }
  })

  if (loading) return null

  const userTodos = data.loadTodo
  return (
    <Styles.Wrapper>
      <Container maxWidth='md'>
        <Styles.Content>
          <Box m={3} justifyContent='center' alignItems='center' display='flex' flexDirection='row'>
            <AddTodo
              setNewTodo={setNewTodo}
              userId={userLogged?.id}
              newTodo={newTodo}
            />
          </Box>
          <List>
              <ListTodo
                userTodos={userTodos}
              />
          </List>
        </Styles.Content>
      </Container>
    </Styles.Wrapper>
  )
}

export default Todo
