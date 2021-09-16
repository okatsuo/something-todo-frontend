import { NoSsr } from '@material-ui/core'
import { NextPage } from 'next'
import RegisterTemplate from '../template/registerTemplate'

const RegisterPage: NextPage = () => {
  return (
    <NoSsr>
      <RegisterTemplate />
    </NoSsr>
  )
}

export default RegisterPage
