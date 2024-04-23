import { Pane, majorScale } from 'evergreen-ui'
import NavBar from 'components/NavBar'
import TechStack from 'components/TechStack'

export default () => (
  <Pane width="100%" maxWidth={majorScale(200)} height="100%" maxHeight={majorScale(200)}>
    <NavBar />
    <Pane
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={majorScale(5)}
      height={majorScale(90)}
    >
      <TechStack />
    </Pane>
  </Pane>
)
