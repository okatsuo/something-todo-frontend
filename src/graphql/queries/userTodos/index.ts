import gql from 'graphql-tag'

export const USER_TODO = gql`
query loadTodo($user_id: String!){
  loadTodo(user_id: $user_id){
    id
    name
    user_id
    active
    description
  }
}
`
