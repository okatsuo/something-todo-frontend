import gql from 'graphql-tag'

export const CREATE_TODO = gql`
mutation createTodo($user_id: Int!, $name: String!, $description: String){
  todoCreate(user_id: $user_id, name: $name,  description: $description, active: true){
    id
    account_id
    name
    description
    active
  }
}
`
