
import { USER_TODO } from '../../graphql/queries/userTodos'
import { Box, Container, List } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import * as Styles from './styles'
import ListTodo from './listTodo'
import AddTodo from './addTodo'
import { UserLoggedInfo } from '../../utils/authentication'

const Todo = () => {
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

  return (
    <Styles.Wrapper>
      <Container maxWidth='md'>
        <Styles.Content>
          <Box m={3} justifyContent='center' alignItems='center' display='flex' flexDirection='row'>
            <AddTodo
              setUserTodo={setUserTodo}
              setNewTodo={setNewTodo}
              userId={userLogged?.id}
              userTodos={userTodos}
              newTodo={newTodo}
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
