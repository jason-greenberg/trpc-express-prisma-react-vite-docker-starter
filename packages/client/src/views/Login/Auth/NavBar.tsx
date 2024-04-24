import { useState } from 'react'
import SignUpButton from 'views/Login/Auth/SignUpButton'
import { majorScale, Pane, Heading, Button } from 'evergreen-ui'
import SignInButton from 'views/Login/Auth/SignInButton'
import AboutSideSheet from 'views/Login/AboutSideSheet'

export default () => {
  const [signInIsOpen, setSignInIsOpen] = useState(false)
  const [signUpIsOpen, setSignUpIsOpen] = useState(false)
  const [sideSheetIsShown, setSideSheetIsShown] = useState(false)

  return (
    <Pane
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      padding={majorScale(2)}
    >
      <AboutSideSheet
        isShown={sideSheetIsShown}
        setIsShown={setSideSheetIsShown}
      />
      <Button
        cursor="pointer"
        appearance="minimal"
        padding={majorScale(1)}
        onClick={() => setSideSheetIsShown(true)}
      >
        <Heading
          size={500}
          textTransform="uppercase"
          fontWeight={400}
          letterSpacing={0.4}
        >
          About
        </Heading>
      </Button>
      <Pane display="flex" gap={majorScale(2)}>
        <SignInButton isOpen={signInIsOpen} setIsOpen={setSignInIsOpen} />
        <SignUpButton isOpen={signUpIsOpen} setIsOpen={setSignUpIsOpen} />
      </Pane>
    </Pane>
  )
}
