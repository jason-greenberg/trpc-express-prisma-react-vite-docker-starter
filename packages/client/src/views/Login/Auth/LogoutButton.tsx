import { Button } from 'evergreen-ui'
import { trpc } from 'lib/trpc'

export default () => {
  const utils = trpc.useUtils()
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => utils.auth.getUser.invalidate()
  })

  return (
    <Button appearance="primary" cursor="pointer" onClick={() => logout.mutate()}>
      Logout
    </Button>
  )
}
