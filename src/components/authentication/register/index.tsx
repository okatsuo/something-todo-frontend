import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { ArrowForwardIos } from '@material-ui/icons'
import Router from 'next/router'
import { useApollo } from '../../../graphql/client'
import { USER_CREATE } from '../../../graphql/mutations/createUser'
import sweetAlert from '../../../utils/window-alert'
import * as Styles from '../styles'
import { Container } from '../../container'
import { FormsButton } from '../../forms/formsButton'
import { Text } from '../../basics/text'
import { CustomLink } from '../../basics/link'
import { FormsTextField } from '../../forms/formsTextField'
import React from 'react'
import { InputAdornment } from '@material-ui/core'

const initialValues = {
  email: '',
  password: '',
  name: '',
  passwordConfirmation: ''
}

interface registerFields {
  email: string
  password: string
  name: string
  passwordConfirmation: string
}

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  passwordConfirmation: Yup.string().required()
})

const Register = () => {
  const apolloClient = useApollo()
  const handleSubmit = async (values: registerFields) => {
    if (values.password === values.passwordConfirmation) {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password
      }
      try {
        await apolloClient.mutate({
          mutation: USER_CREATE,
          variables: user
        })
        await Router.push('/login')
      } catch (error) {
        await sweetAlert({
          title: 'Opa...',
          icon: 'error',
          text: `${error}`
        })
      }
    } else {
      await sweetAlert({
        title: 'Opa...',
        icon: 'question',
        text: 'a confirmação da senha está errada'
      })
    }
  }

  return (
    <Styles.Wrapper>
      <Container>
        <Styles.Content>
          <Styles.Square>
            <Formik initialValues={initialValues}
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
                      name="name"
                      type="text"
                      label="name"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                          </InputAdornment>
                        )
                      }}
                      helperText={errors.name && touched.name && errors.name}
                    />

                    <Field
                      as={FormsTextField}
                      name="email"
                      type="email"
                      label="email"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
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
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                          </InputAdornment>
                        )
                      }}
                      helperText={errors.password && touched.password && errors.password}
                    />

                    <Field
                      as={FormsTextField}
                      name="passwordConfirmation"
                      type="password"
                      label="confirmação da senha"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                          </InputAdornment>
                        )
                      }}
                      helperText={errors.passwordConfirmation && touched.passwordConfirmation && errors.passwordConfirmation}
                    />

                    <FormsButton endIcon={<ArrowForwardIos />} name='submit' type='submit'>
                      <Text>CADASTRAR</Text>
                    </FormsButton>
                  </Styles.Items>
                </Form>
              )}
            </Formik>
            <Styles.ToRegister >
              <Text>Já tem uma conta ?
                <CustomLink
                  variant='body1'
                  onClick={async () => await Router.push('/login')}
                > entrar
                </CustomLink>
              </Text>
            </Styles.ToRegister>
          </Styles.Square>
        </Styles.Content>
      </Container>
    </Styles.Wrapper>
  )
}

export default Register
