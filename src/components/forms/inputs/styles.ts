import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
`

export const Container = styled.div`
  ${({ theme }) => css`
    padding-bottom: ${theme.spacing.normal};
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`
