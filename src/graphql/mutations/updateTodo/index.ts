import gql from 'graphql-tag'

export const UPDATE_TODO = gql`
  mutation updateTodo($todo_id: Int!, $fields: IUpdateTodo!){
    updateTodo(todo_id:$todo_id, fields: $fields){
      id
      active
      user_id
      name
      description
    }
  }
`
