import { Box, Container, List, ListItem, ListItemText, TextField } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import { Hr } from '../../basics/hr'
import * as Styles from './styles'

const Todo = ({ userTodo }: any) => {
  return (
    <>
      <Styles.Wrapper>
        <Container maxWidth='md'>
          <Styles.Content>
            <Box m={3} justifyContent='center' alignItems='center' display='flex' flexDirection='row'>
              <TextField fullWidth variant='filled' label='nova' style={{ paddingRight: '15px' }}>inserir uma nova terefa</TextField>
              <AddCircle accentHeight='20px' style={{ color: '#40D67C', fontSize: '60px' }} />
            </Box>
            <List component="nav" aria-label="mailbox folders">
              {userTodo.map((todo: any) =>
                <>
                  <ListItem button >
                    <ListItemText primary={todo.name}/>
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
