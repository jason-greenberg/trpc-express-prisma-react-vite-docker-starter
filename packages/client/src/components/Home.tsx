import { Pane, Heading } from "evergreen-ui";
import AddTodo from "./AddTodo";
import ListTodos from "./ListTodos";

export default () => (
  <Pane>
    <Pane>
      <Heading>Vite + React | Express | tRPC</Heading>
    </Pane>
    <Pane>
      <ListTodos />
      <AddTodo />
    </Pane>
  </Pane>
);
