import { DetailedHTMLProps, HTMLAttributes, useState } from 'react'
import * as Styles from './styles'

interface TodoCheckboxProps {
  checked: boolean
  text: string
}

export const TodoCheckbox = ({ checked, text }: TodoCheckboxProps, props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(checked)

  const handleChecked = () => {
    return setIsOpen(!isOpen)
  }
  return (
    <div {...props} style={{ display: 'flex', alignItems: 'center' }}>
      <Styles.Checkbox
        onClick={handleChecked}
        checked={isOpen}
        icon={<Styles.CheckCircleOutline />}
        checkedIcon={<Styles.CheckCircleSharp />}
      />
      <Styles.TextContent>
        {isOpen ? <del>{text}</del> : text}
      </Styles.TextContent>
    </div>
  )
}
