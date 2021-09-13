import { Box, Container, InputAdornment, List, ListItem, ListItemText } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import React from 'react'
import { Hr } from '../../basics/hr'
import { InputAddTodo } from '../addTodo'
import * as Styles from './styles'

const Todo = ({ userTodo }: any) => {
  return (
    <>
      <Styles.Wrapper>
        <Container maxWidth='md'>
          <Styles.Content>
            <Box m={3} justifyContent='center' alignItems='center' display='flex' flexDirection='row'>
              <InputAddTodo
                variant='filled'
                label='adicionar uma nova terefa'
                style={{ paddingRight: '15px' }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddCircle accentHeight='20px'/>
                    </InputAdornment>
                  ),
                  disableUnderline: true
                }}
              />
            </Box>
            <List component="nav" aria-label="mailbox folders">
              {userTodo.map((todo: any) =>
                <>
                  <ListItem button >
                    <ListItemText primary={todo.name} />
                  </ListItem>
                  <Hr />
                </>
              )}
            </List>
          </Styles.Content>
        </Container>
      </Styles.Wrapper>
    </>
  )
}

export default Todo
