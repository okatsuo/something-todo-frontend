import gql from 'graphql-tag'

export const REMOVE_TODO = gql`
  mutation removeTodo($id: String!){
    removeTodo(id: $id)
  }
`
