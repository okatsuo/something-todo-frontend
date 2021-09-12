import { TextField } from '@material-ui/core'
import styled from 'styled-components'

export const FormsTextField = styled(TextField)`
  padding-bottom: 20px;

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
    }

  /* input text  */
  & .MuiInputBase-input {
    color: white;
  }

  /* icon and  */
  & .MuiInputBase-adornedStart {
    color: #36B269;
  }

  /* MuiFormHelperText-root */
  & .MuiFormHelperText-root {
    color: white;
  }
`
