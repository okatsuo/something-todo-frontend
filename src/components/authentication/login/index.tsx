import { Formik, Form, Field } from 'formik'
import Router from 'next/router'
import * as Yup from 'yup'
import * as Styles from '../styles'
import { USER_LOGIN } from '../../../graphql/queries/login'
import { initializeApollo } from '../../../graphql/client'
import sweetAlert from '../../../utils/window-alert'
import { FormsButton } from '../../forms/formsButton'
import { ArrowForwardIos, LockOpen } from '@material-ui/icons'
import { FormsCheckbox } from '../../forms/formsCheckbox'
import { FormControlLabel, InputAdornment, Container } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import React, { useState } from 'react'
import { Text } from '../../basics/text'
import { CustomLink } from '../../basics/link'
import { FormsTextField } from '../../forms/formsTextField'
import Loading from '../../basics/loading'
import { setUserToken } from '../../../utils/authentication/setUserToken'
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
  email: Yup.string().required('email é necessário').email(),
  password: Yup.string().min(3).required('senha é necessária')
})

const Login = () => {
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (values: ILogin) => {
    const apolloClient = initializeApollo()
    const user = {
      email: values.email,
      password: values.password
    }
    try {
      setLoading(true)
      const { data } = await apolloClient.query({
        query: USER_LOGIN,
        variables: user
      })
      const { token } = data.accountLogin
      setUserToken({ value: token, maxAge: values.rememberMe ? 2147483647 : 8640 })
      setLoading(false)
      await Router.push('/')
    } catch (error) {
      setLoading(false)
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
                    <Field
                      as={FormsTextField}
                      name="email"
                      type="email"
                      label="email"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        )
                      }}
                      helperText={errors.email && touched.email && errors.email}
                    />

                    <Field
                      as={FormsTextField}
                      name="password"
                      type="password"
                      label="senha"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOpen />
                          </InputAdornment>
                        )
                      }}
                      helperText={errors.password && touched.password && errors.password}
                    />

                    <FormControlLabel
                      name='rememberMe'
                      control={<FormsCheckbox name='rememberMe' size='small' color='default' />}
                      label="lembrar-me"
                    />
                    <FormsButton name='submit' type='submit' color='primary' endIcon={<ArrowForwardIos />}>
                      <Text>ENTRAR</Text>
                    </FormsButton>
                  </Styles.Items>
                </Form>
              )}
            </Formik>
            <Loading open={loading}/>
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
