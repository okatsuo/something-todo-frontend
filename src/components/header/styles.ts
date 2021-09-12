import styled, { css } from 'styled-components'

export const Wrapper = styled.nav`
${({ theme }) => css`
background: ${theme.colors.secondaryBackground};
`}
`

export const Container = styled.div`
  padding: 10px 10px;
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
