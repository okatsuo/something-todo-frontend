import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const Square = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    width: auto;
    height: auto;
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    box-shadow: 1px 1px 5px lightgrey;
  `}
`

export const Items = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface ToRegisterProps {
  position?: {
    bottom?: string
  }
}

export const ToRegister = styled.div<ToRegisterProps>`
  position: relative;
  bottom: ${props => props?.position?.bottom ?? '3px'};
`

export const Register = styled.span`
  padding-left: 5px;
  color: lightblue;
  cursor: pointer;
`
