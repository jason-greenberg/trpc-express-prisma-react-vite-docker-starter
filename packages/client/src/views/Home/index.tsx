import { Pane, majorScale } from 'evergreen-ui'
import NavBar from 'components/NavBar'
import TechStack from 'views/Home/TechStack'
import background from 'assets/Asset 108.svg'

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
