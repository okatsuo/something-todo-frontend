import { Container } from '@material-ui/core'
import Router from 'next/router'
import { UserLoggedInfo, UserLogout } from '../../utils/user-account-stuff'
import { CustomLink } from '../basics/link'
import { Text } from '../basics/text'
import * as Styles from './styles'

const Header = () => {
  const user = UserLoggedInfo()

  const logout = async () => {
    UserLogout()
    await Router.push('/login')
  }

  return (
    <Styles.AppHeader position='static'>
      <Container maxWidth='lg'>
        <Styles.AppToolbar>
          <Text variant='h6'>Something todo</Text>
          <Styles.UserInfo>
            <Styles.Email>
              <Text>
                {user?.email}
              </Text>
            </Styles.Email>
            <CustomLink onClick={async () => await logout()}>
              sair
            </CustomLink>
          </Styles.UserInfo>
        </Styles.AppToolbar>
      </Container>
    </Styles.AppHeader>
  )
}

export default Header
