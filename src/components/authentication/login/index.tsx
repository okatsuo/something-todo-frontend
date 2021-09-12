import { Formik, Form } from 'formik'
import Router from 'next/router'
import * as Yup from 'yup'
import { setCookie } from 'nookies'
import { Container } from '../../container'
import InputForm from '../../forms/inputs'
import * as Styles from '../styles'
import { USER_LOGIN } from '../../../graphql/queries/login'
import { initializeApollo } from '../../../graphql/client'
import sweetAlert from '../../../utils/window-alert'
import { FormsButton } from '../../forms/formsButton'
import { ArrowForwardIos } from '@material-ui/icons'
import { FormsCheckbox } from '../../forms/formsCheckbox'
import { FormControlLabel } from '@material-ui/core'
import React from 'react'
import { Text } from '../../basics/text'
import { CustomLink } from '../../basics/link'
interface ILogin {
  email: string
  password: string
  rememberMe: boolean
}

const initialValues: ILogin = {
  email: '',
  password: '',
  rememberMe: false
}

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().min(3).required()
})

const Login = () => {
  const handleSubmit = async (values: ILogin) => {
    const apolloClient = initializeApollo()
    const user = {
      email: values.email,
      password: values.password
    }
    try {
      const { data } = await apolloClient.query({
        query: USER_LOGIN,
        variables: user
      })
      const { token } = data.accountLogin
      setCookie(null, 't_user', token, {
        maxAge: 8640,
        path: '/'
      })
      await Router.push('/')
    } catch (error) {
      await sweetAlert({
        title: 'Opa...',
        icon: 'error',
        text: `${error}`
      })
    }
  }

  return (
    <Styles.Wrapper>
      <Container>
        <Styles.Content>
          <Styles.Square>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                await handleSubmit(values)
              }}
              validationSchema={schema}
            >
              {({ errors, touched }) => (
                <Form>
                  <Styles.Items>
                    <InputForm
                      name="email"
                      type="email"
                      placeholder="email"
                      error={errors.email && touched.email && errors.email} />

                    <InputForm
                      name="password"
                      type="password"
                      placeholder="senha"
                      error={errors.password && touched.password && errors.password} />
                    <FormControlLabel
                      name='rememberMe'
                      control={<FormsCheckbox name='rememberMe' size='small' color='default' />}
                      label="lembrar-me"
                    />
                    <FormsButton name='submit' type='submit' endIcon={<ArrowForwardIos />}>
                      <Text>ENTRAR</Text>
                    </FormsButton>
                  </Styles.Items>
                </Form>
              )}
            </Formik>
            <Text>Não tem uma conta ?
                <CustomLink
                  variant='body1'
                  onClick={async () => await Router.push('/register')}
                > registre-se
                </CustomLink>
              </Text>
          </Styles.Square>
        </Styles.Content>
      </Container>
    </Styles.Wrapper>
  )
}

export default Login
