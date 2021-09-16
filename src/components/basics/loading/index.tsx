import { CircularProgress } from '@material-ui/core'
import { CustomLoading } from './styles'

interface LoadingOptions {
  open: boolean
}

const Loading = ({ open }: LoadingOptions) => {
  return (
    <CustomLoading open={open}>
      <CircularProgress color='inherit' />
    </CustomLoading>
  )
}

export default Loading
