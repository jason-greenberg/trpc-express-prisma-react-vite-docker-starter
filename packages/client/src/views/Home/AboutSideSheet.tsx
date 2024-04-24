import {
  SideSheet,
  majorScale,
  Paragraph,
  Pane,
  Heading,
  Card,
  Link,
  Image,
  minorScale
} from 'evergreen-ui'

import linkedIn from 'views/Home/assets/linkedin-logo.png'
import github from 'views/Home/assets/gh-logo.png'

export type Props = {
  isShown: boolean
  setIsShown: (arg: boolean) => void
}

export default ({ isShown, setIsShown }: Props) => (
  <SideSheet
    isShown={isShown}
    onCloseComplete={() => setIsShown(false)}
    containerProps={{
      display: 'flex',
      flex: '1',
      flexDirection: 'column'
    }}
    width={majorScale(60)}
  >
    <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
      <Pane padding={16}>
        <Heading
          size={600}
          // textTransform="uppercase"
          fontWeight={400}
          letterSpacing={0.4}
        >
          About This Skeleton
        </Heading>
      </Pane>
    </Pane>
    <Pane flex="1" background="tint1" padding={16}>
      <Card
        backgroundColor="white"
        elevation={0}
        display="flex"
        justifyContent="center"
        padding={majorScale(2)}
      >
        <Pane display="flex" flexDirection="column" gap={majorScale(2)}>
          <Paragraph>
            I made this skeleton to help me get started with tRPC, using some
            of my current favorite tools.{' '}
            {`Please enjoy this skeleton as much as I did building it :)`}
          </Paragraph>
          <Paragraph>
            Feel free to connect if you have any questions or suggestions.
          </Paragraph>
          <Pane
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={majorScale(3)}
            width="100%"
            marginTop={majorScale(2)}
          >
            <Pane
              display="flex"
              justifyContent="center"
              alignItems="center"
              hoverElevation={2}
              borderRadius={2}
              width={majorScale(5)}
              height={majorScale(4)}
            >
              <Link
                href="https://www.linkedin.com/in/jason-g-greenberg/"
                target="_blank"
              >
                <Image src={linkedIn} height={majorScale(5)} />
              </Link>
            </Pane>
            <Pane
              display="flex"
              justifyContent="center"
              alignItems="center"
              hoverElevation={2}
              borderRadius="50%"
              width={majorScale(5)}
              height={minorScale(9)}
            >
              <Link href="https://github.com/jason-greenberg" target="_blank">
                <Image src={github} height={majorScale(5)} />
              </Link>
            </Pane>
          </Pane>
        </Pane>
      </Card>
    </Pane>
  </SideSheet>
)
