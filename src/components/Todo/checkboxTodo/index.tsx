import { DetailedHTMLProps, HTMLAttributes, useState } from 'react'
import * as Styles from './styles'

interface TodoCheckboxProps {
  checked: boolean
}

export const TodoCheckbox = ({ checked }: TodoCheckboxProps, props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(checked)

  const handleChecked = () => {
    return setIsOpen(!isOpen)
  }
  console.log(checked)
  return (
    <div {...props}>
      <Styles.Checkbox
      onClick={handleChecked}
       checked={isOpen}
        icon={<Styles.CheckCircleOutline />}
        checkedIcon={<Styles.CheckCircleSharp />}
      />
    </div>
  )
}
