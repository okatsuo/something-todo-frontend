import { Formik, Form } from 'formik'
import Router from 'next/router'
import * as Yup from 'yup'
import { setCookie } from 'nookies'
import { Container } from '../../container'
import InputForm from '../../forms/inputs'
import Button from '../../forms/button'
import * as Styles from '../styles'
import CheckboxForm from '../../forms/checkbox'
import { USER_LOGIN } from '../../../graphql/queries/login'
import { initializeApollo } from '../../../graphql/client'
import sweetAlert from '../../../utils/window-alert'
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

                    <CheckboxForm name='rememberMe' message='lembrar-me' />

                    <Button name='submit' type="submit" value="ENTRAR" />
                  </Styles.Items>
                </Form>
              )}
            </Formik>
            <Styles.ToRegister>
              Não tem uma conta ?
              <Styles.Register onClick={async () => await Router.push('/register')}>registre-se</Styles.Register>
            </Styles.ToRegister>
          </Styles.Square>
        </Styles.Content>
      </Container>
    </Styles.Wrapper>
  )
}

export default Login
