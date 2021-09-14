import React from 'react'
import LoginTemplate from '../template/loginTemplate'

const LoginPage = () => {
  return (
    <LoginTemplate />
  )
}

export const getStaticProps = async () => {
  return {
    props: {}
  }
}

export default LoginPage
