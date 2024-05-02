import { useState } from 'react'
import { trpc } from 'lib/trpc'
import {
  Button,
  majorScale,
  Pane,
  TextInput,
  Heading,
  toaster,
  Popover,
  Position
} from 'evergreen-ui'

type SignInButtonProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function SignInButton({ isOpen, setIsOpen }: SignInButtonProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const utils = trpc.useUtils()

  const signIn = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      await utils.auth.getUser.invalidate()
      toaster.success('Sign-in successful!', { duration: 2 })
    },
    onError: (error) => {
      console.error(error)
      toaster.danger('Sign-in failed, please try again.')
    }
  })

  const handleSignIn = async () => {
    await signIn.mutateAsync({ email, password })
    setIsOpen(false)
  }

  return (
    <Popover
      isShown={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      position={Position.BOTTOM_RIGHT}
      content={
        <Pane
          width={320}
          paddingX={majorScale(3)}
          paddingY={majorScale(3)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap={majorScale(2)}
          background="white"
          elevation={1}
          borderRadius={4}
        >
          <Heading size={700} fontWeight={400}>
            Sign In
          </Heading>
          <TextInput
            width="100%"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <TextInput
            width="100%"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            onKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                await handleSignIn()
              }
            }}
          />
          <Button
            appearance="primary"
            intent="success"
            onClick={async () => await handleSignIn()}
            isLoading={signIn.isLoading}
            width="100%"
          >
            Sign In
          </Button>
        </Pane>
      }
    >
      <Button cursor="pointer" onClick={() => setIsOpen(!isOpen)}>
        Sign In
      </Button>
    </Popover>
  )
}
