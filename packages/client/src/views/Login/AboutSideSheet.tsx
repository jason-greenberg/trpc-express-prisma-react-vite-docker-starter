import {
  SideSheet,
  majorScale,
  Paragraph,
  Pane,
  Heading,
  Card,
  Link,
  Image,
  minorScale,
  UnorderedList,
  ListItem,
  Elevation,
  Text,
  Li
} from 'evergreen-ui'

import linkedIn from 'views/Login/assets/linkedin-logo.png'
import github from 'views/Login/assets/gh-logo.png'

export type Props = {
  isShown: boolean
  setIsShown: (arg: boolean) => void
}

const cardProps = {
  backgroundColor: 'white',
  elevation: 0 as Elevation,
  display: 'flex',
  justifyContent: 'center',
  padding: majorScale(2)
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
    <Pane
      display="flex"
      flexDirection="column"
      flex="1"
      background="tint1"
      padding={16}
      gap={16}
    >
      <Card {...cardProps}>
        <Pane display="flex" flexDirection="column" gap={majorScale(2)}>
          <Paragraph>
            This skeleton is designed to be a turn-key solution, with the
            following features implemented:
          </Paragraph>
          <Pane>
            <Heading size={500} fontWeight={400}>
              User Management
            </Heading>
            <UnorderedList>
              <ListItem>
                <Text>Login, logout, and registration with JWT tokens</Text>
              </ListItem>
              <ListItem>
                <Text>
                  Protected routes: both protected client-side routing and
                  protected server-side procedure calls
                </Text>
              </ListItem>
            </UnorderedList>
          </Pane>
          <Pane>
            <Heading size={500} fontWeight={400}>
              Containerization
            </Heading>
            <UnorderedList>
              <ListItem>
                <Text>
                  Dockerfiles for client and server, with docker-compose.yaml
                  for easy deployment
                </Text>
              </ListItem>
              <ListItem>
                <Text>Containerized Postgres database for development</Text>
              </ListItem>
            </UnorderedList>
          </Pane>
          <Pane>
            <Heading size={500} fontWeight={400}>
              Example CRUD Feature
            </Heading>
            <UnorderedList>
              <ListItem>
                <Text>
                  A simple ToDo list example with client-side state management
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  Demonstrates how to use tRPC to interact with the server as
                  well as simple cache-invalidation patterns
                </Text>
              </ListItem>
            </UnorderedList>
          </Pane>
        </Pane>
      </Card>
      <Card {...cardProps}>
        <Pane display="flex" flexDirection="column" gap={majorScale(2)}>
          <Paragraph>
            I built this to help me get started with tRPC, using some of my
            current favorite tools. Please enjoy this skeleton as much as I
            enjoyed building it!
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
