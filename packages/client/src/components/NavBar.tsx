import { useState } from 'react'
import SignUpButton from 'components/Auth/SignUpButton'
import { majorScale, Pane, Heading, toaster } from 'evergreen-ui'
import SignInButton from 'components/Auth/SignInButton'

export default () => {
  const [signInIsOpen, setSignInIsOpen] = useState(false)
  const [signUpIsOpen, setSignUpIsOpen] = useState(false)

  return (
    <Pane
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      padding={majorScale(2)}
    >
      <Heading>Nav Bar</Heading>
      <Pane display="flex" gap={majorScale(2)}>
        <SignInButton isOpen={signInIsOpen} setIsOpen={setSignInIsOpen} />
        <SignUpButton isOpen={signUpIsOpen} setIsOpen={setSignUpIsOpen} />
      </Pane>
    </Pane>
  )
}
