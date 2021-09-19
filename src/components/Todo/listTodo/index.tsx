import React from 'react'
import { Hr } from '../../basics/hr'
import { TodoCheckbox } from '../checkboxTodo'
import DeleteTodo from '../removeTodo'
import * as Styles from './styles'

interface ListTodoProps {
  userTodos: any[]
  handleUpdateTodo: (values: any) => void
  handleRemoveTodo: (values: string) => void
}

const ListTodo = (props: ListTodoProps) => {
  const { userTodos, handleUpdateTodo, handleRemoveTodo } = props
  return (
    <>
      {userTodos.map((todo: any) =>
        <div key={todo.id}>
          <Styles.ListItem button key={todo.id}>

            <Styles.ListItemText
              primary={
                <span onClick={async () => handleUpdateTodo(todo)} >
                  <TodoCheckbox checked={!todo.active} text={todo.name} />
                </span>
              }
            />
            <DeleteTodo onClick={async () => handleRemoveTodo(todo.id)} />
          </Styles.ListItem>
          <Hr />
        </div>
      )}
    </>
  )
}

export default ListTodo
