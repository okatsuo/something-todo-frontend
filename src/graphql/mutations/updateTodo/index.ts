import gql from 'graphql-tag'

export const UPDATE_TODO = gql`
  mutation updateTodo($id: Int!, $fields: IUpdateTodo!){
    updateTodo(id:$id, fields: $fields){
      id
    }
  }
`
