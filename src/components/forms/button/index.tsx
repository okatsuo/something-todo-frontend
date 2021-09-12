import { Field } from 'formik'

interface ButtonProps {
  type?: string
  value: string
  name?: string
  width?: string
}

const Button: React.FC<ButtonProps> = ({
  type = 'text',
  name = 'submit',
  width = '100px',
  value
}) => {
  return (
    <>
      <Field
        name={name}
        type={type}
        value={value}
        style={{
          background: '#40D67C',
          color: 'white',
          fontSize: 16,
          textAlign: 'center',
          borderRadius: '20px',
          border: 'none',
          width,
          height: '30px',
          cursor: 'pointer'
        }}
      />
    </>
  )
}

export default Button
