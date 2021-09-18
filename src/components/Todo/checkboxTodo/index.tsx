import { DetailedHTMLProps, HTMLAttributes } from 'react'
import * as Styles from './styles'

export const TodoCheckbox = (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div {...props}>
      <Styles.Checkbox
        icon={<Styles.CheckCircleOutline />}
        checkedIcon={<Styles.CheckCircleSharp />}
      />
    </div>
  )
}
