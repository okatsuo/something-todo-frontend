import { TextField } from '@material-ui/core'
import styled from 'styled-components'

export const InputAddTodo = styled(TextField)`

  /* MuiOutlinedInput-root */
  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline{
    border-color: white;
  }

  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: lightgray;
  }

  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{
    border-color: gray;
  }

  /* label */
  & .MuiInputLabel-root {
      color: whitesmoke;
      margin-right: 10px;
    }

  /* input text  */
  & .MuiInputBase-input {
    color: white;
  }

  /* icon and  */
  & .MuiSvgIcon-root {
    color: #40D67C;
    font-size: 3rem;
  }

  /* MuiFormHelperText-root */
  & .MuiFormHelperText-root {
    color: white;
  }
`
