import { Field } from 'formik'
import theme from '../../../../styles/theme'
import * as Styles from './styles'

interface FormProps {
  name: string
  required?: boolean
  inputProps?: any
  type?: string
  placeholder?: string
  value?: string
  background?: string
  style?: React.CSSProperties
  error?: any
}

const InputForm: React.FC<FormProps> = ({
  name,
  required = false,
  type = 'text',
  placeholder,
  value,
  style = {},
  error
}) => {
  return (
    <Styles.Wrapper>
      <Styles.Container>
        <Field
          name={name}
          required={required}
          type={type}
          placeholder={placeholder}
          value={value}
          error={error}
          style={{
            background: theme.colors.lightGrey,
            fontSize: theme.font.normal,
            color: theme.colors.primaryBackground,
            textAlign: 'center',
            borderRadius: '20px',
            border: 'none',
            height: '30px',
            ...style
          }}
        />
        {error}
      </Styles.Container>
    </Styles.Wrapper>
  )
}

export default InputForm
