import gql from 'graphql-tag'

export const CREATE_TODO = gql`
mutation createTodo($user_id: String!, $name: String!, $description: String, $active: Boolean!){
  todoCreate(user_id: $user_id, name: $name,  description: $description, active: $active){
    id
    user_id
    name
    description
    active
  }
}
`
