import { Pane, Heading, majorScale } from "evergreen-ui";
import AddTodo from "./AddTodo";
import NavBar from "./NavBar";

export default () => (
  <Pane width="100%" maxWidth={majorScale(200)}>
    <NavBar />
    <Pane
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={majorScale(80)}
    >
      <Heading>Vite + React • Evergreen-UI • Express • tRPC • Prisma</Heading>
    </Pane>
  </Pane>
);
