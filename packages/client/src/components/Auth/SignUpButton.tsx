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
  Position,
  Text
} from 'evergreen-ui'

type SignUpButtonProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function SignUpButton({ isOpen, setIsOpen }: SignUpButtonProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const mutation = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      toaster.success('Sign-up successful!')
    },
    onError: (error) => {
      console.error(error)
      toaster.danger('Sign-up failed, please try again.')
    }
  })

  const handleSignUp = async () => {
    await mutation.mutateAsync({ email, password })
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
          paddingX={majorScale(4)}
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
          <Heading size={600} marginBottom={majorScale(2)}>
            Sign Up
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
          />
          <TextInput
            width="100%"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
          <Button
            appearance="primary"
            intent="success"
            onClick={handleSignUp}
            width="100%"
          >
            Sign Up
          </Button>
        </Pane>
      }
    >
      <Button
        appearance={isOpen ? 'minimal' : 'primary'}
        intent={isOpen ? 'none' : 'success'}
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Sign Up
      </Button>
    </Popover>
  )
}