import { Pane, Heading } from 'evergreen-ui';

export default () => (
  <Pane 
    width="100%" 
    height="100vh" 
    display="flex" 
    justifyContent="center" 
    alignItems="center"
  >
    <Heading 
      size={900} 
      fontWeight={400} 
      textTransform="uppercase" 
      textAlign="center"
    >
      Home
    </Heading>
  </Pane>
);
