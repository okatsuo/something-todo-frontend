import gql from 'graphql-tag'

export const USER_CREATE = gql`
 mutation userCreate($name: String!, $email: String!, $password: String!){
   userCreate(name: $name, email: $email, password: $password){
      id
      email
      name
   }
 }
`
