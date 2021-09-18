import { DetailedHTMLProps, HTMLAttributes } from 'react'
import * as Styles from './styles'

const DeleteTodo = (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <span {...props}>
      <Styles.Delete/>
    </span>
  )
}

export default DeleteTodo
