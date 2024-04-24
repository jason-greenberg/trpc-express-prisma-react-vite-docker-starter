import { Pane, majorScale } from 'evergreen-ui'
import NavBar from 'views/Login/Auth/NavBar'
import TechStack from 'views/Login/TechStack'

export default () => (
  <Pane width="100%" height="100%" maxHeight={majorScale(200)}>
    <NavBar />
    <Pane
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={majorScale(5)}
      height={majorScale(90)}
      position="relative"
    >
      <TechStack />
    </Pane>
  </Pane>
)
