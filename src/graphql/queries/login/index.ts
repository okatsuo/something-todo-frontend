import gql from 'graphql-tag'

export const USER_LOGIN = gql`
  query UserLogin($email: String!, $password: String!) {
    accountLogin(email: $email, password: $password){
      token
      account {
        id
        email
        name
      }
    }
  } 
`
