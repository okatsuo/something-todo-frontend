import gql from 'graphql-tag'

export const REMOVE_TODO = gql`
  mutation removeTodo($id: Int!){
    removeTodo(id: $id)
  }
`
