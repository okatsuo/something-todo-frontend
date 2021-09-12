import { AppBar, Toolbar } from '@material-ui/core'
import styled, { css } from 'styled-components'

export const Wrapper = styled.nav`
${({ theme }) => css`
background: ${theme.colors.secondaryBackground};
`}
`

export const UserInfo = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`

export const Email = styled.text`
  cursor: pointer;
`

export const Logout = styled.text`
 cursor: pointer;
`
export const AppHeader = styled(AppBar)`
  ${({ theme }) => css`
  background: ${theme.colors.secondaryBackground};
`}
`

export const AppToolbar = styled(Toolbar)`
  display: flex;  
  justify-content: space-between;
`
