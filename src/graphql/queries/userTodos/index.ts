import gql from 'graphql-tag'

export const USER_TODO = gql`
query loadTodo($user_id: Int!){
  loadTodo(user_id: $user_id){
    id
    name
    account_id
    active
    description
  }
}
`
