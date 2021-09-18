import { useQuery } from '@apollo/client'
import { Box, Container, InputAdornment, List, ListItem, ListItemText } from '@material-ui/core'
import { AddCircle, CheckCircle, Delete, RadioButtonUnchecked } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { initializeApollo } from '../../../graphql/client'
import { CREATE_TODO } from '../../../graphql/mutations/createTodo'
import { USER_TODO } from '../../../graphql/queries/userTodos'
import { UserLoggedInfo } from '../../../utils/user-account-stuff'
import { Hr } from '../../basics/hr'
import { InputAddTodo } from '../addTodo'
import { TodoCheckbox } from '../checkboxTodo'
import * as Styles from './styles'

const Todo = () => {
  const apolloClient = initializeApollo()
  const [newTodo, setNewTodo] = useState('')
  const [userTodos, setUserTodo] = useState([])
  const userLogged = UserLoggedInfo()
  const userCookies = UserLoggedInfo()
  const { data: userTodo, loading } = useQuery(USER_TODO, {
    variables: { user_id: userCookies?.id }
  })

  const handleRegisterTodo = async () => {
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
      setUserTodo(userTodos.concat(data.todoCreate))
    } catch (error) {
      console.error('deu erro...', error)
    }
  }
  useEffect(() => {
    if (userTodo) {
      setUserTodo(userTodo.loadTodo)
    }
  }, [userTodo])

  return (
    <>
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <div onClick={async () => await handleRegisterTodo()} style={{ cursor: 'pointer' }}>
                        <AddCircle accentHeight='20px'/>
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
                <ListItem button >
                  <TodoCheckbox icon={<RadioButtonUnchecked color='inherit'/>} checkedIcon={<CheckCircle/>} />
                  <ListItemText primary={todo.name} />
                  <Delete />
                </ListItem>
                <Hr />
              </div>
              )}
            </List>
          </Styles.Content>
        </Container>
      </Styles.Wrapper>
    </>
  )
}

export default Todo
