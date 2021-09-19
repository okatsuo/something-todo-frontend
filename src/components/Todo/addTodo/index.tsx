import { InputAdornment } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import React from 'react'
import * as Styles from './styles'

interface AddTodoProps {
  value: string
  setNewTodo: (value: string) => void
  handleKeyboardEvent: (value: React.KeyboardEvent<HTMLDivElement>) => void
  handleRegisterTodo: () => void
}

const AddTodo = (props: AddTodoProps) => {
  const { value, setNewTodo, handleKeyboardEvent, handleRegisterTodo } = props
  return (
    <Styles.InputAddTodo
      variant='filled'
      label='adicionar uma nova tarefa'
      style={{ paddingRight: '15px' }}
      fullWidth
      value={value}
      onChange={(event) => setNewTodo(event.target.value)}
      onKeyPress={async (target) => handleKeyboardEvent(target)}
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
