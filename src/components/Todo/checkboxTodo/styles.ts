import { Checkbox as MaterialCheckbox } from '@material-ui/core'
import {
  CheckCircleOutline as MaterialCheckCircleOutline,
  CheckCircleSharp as MaterialCheckCircleSharp
} from '@material-ui/icons'

import styled, { css } from 'styled-components'

export const Checkbox = styled(MaterialCheckbox)`
margin-right: '1rem';
`

export const CheckCircleOutline = styled(MaterialCheckCircleOutline)`
color: grey;
`

export const CheckCircleSharp = styled(MaterialCheckCircleSharp)`
${({ theme }) => css`
color: ${theme.colors.green}
`}
`

export const TextContent = styled.div`
    max-width: 95%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
