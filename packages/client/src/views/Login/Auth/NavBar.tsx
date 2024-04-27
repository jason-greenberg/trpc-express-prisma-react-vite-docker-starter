import { useState } from 'react'
import { trpc } from 'lib/trpc'
import SignUpButton from 'views/Login/Auth/SignUpButton'
import LogoutButton from 'views/Login/Auth/LogoutButton'
import { majorScale, Pane, Heading, Button, Spinner } from 'evergreen-ui'
import SignInButton from 'views/Login/Auth/SignInButton'
import AboutSideSheet from 'views/Login/AboutSideSheet'
import Center from 'components/CenterPage'
import { useNavigate } from 'react-router-dom'

export default () => {
  const { data: user, isLoading } = trpc.auth.getUser.useQuery()
  const navigate = useNavigate()
  const [signInIsOpen, setSignInIsOpen] = useState(false)
  const [signUpIsOpen, setSignUpIsOpen] = useState(false)
  const [sideSheetIsShown, setSideSheetIsShown] = useState(false)

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  return (
    <Pane
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      padding={majorScale(2)}
    >
      <Pane display="flex" gap={majorScale(1)}>
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
        { user && <Button
          cursor="pointer"
          appearance="minimal"
          padding={majorScale(1)}
          onClick={() => navigate('/todo')}
          intent='success'
        >
          <Heading
            size={500}
            textTransform="uppercase"
            fontWeight={500}
            letterSpacing={0.4}
            color='success'
          >
            Example
          </Heading>
        </Button>}
      </Pane>
      <Pane display="flex" gap={majorScale(2)}>
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <SignInButton isOpen={signInIsOpen} setIsOpen={setSignInIsOpen} />
            <SignUpButton isOpen={signUpIsOpen} setIsOpen={setSignUpIsOpen} />
          </>
        )}
      </Pane>
    </Pane>
  )
}
