import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'

export const FormsButton = styled(Button)`
 ${({ theme }) => css`
    background-color: ${theme.colors.green};
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    margin-top: 10px;
    padding: 7px 14px;
    &:hover {
      background-color: ${theme.colors.darkGreen};
    }
 `}
`
