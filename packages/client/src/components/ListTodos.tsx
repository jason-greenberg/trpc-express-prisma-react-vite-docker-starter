import {
  Button,
  Heading,
  ListItem,
  Paragraph,
  Spinner,
  UnorderedList,
} from "evergreen-ui";
import { trpc } from "lib/trpc";

export default function ListTodos() {
  function handleDelete() {}
  function updateTodo() {}

  const response = trpc.todo.list.useQuery();
  const deleteMutation = trpc.todo.delete.useMutation();
  const updateMutation = trpc.todo.update.useMutation();
  const trpcContext = trpc.useContext();

  if (response.isError) {
    return <Heading>Error...</Heading>;
  }

  if (response.isLoading) {
    return <Spinner />;
  }

  return (
    <UnorderedList className="">
      {response.data.map((todo) => {
        return (
          <ListItem key={todo.id}>
            <Paragraph>{todo.title}</Paragraph>

            <Button
              onClick={() =>
                updateMutation.mutate(
                  { id: todo.id, isCompleted: !todo.isCompleted },
                  { onSuccess: () => trpcContext.todo.list.invalidate() }
                )
              }
            >
              {todo.isCompleted ? "Complete" : "Incomplete"}
            </Button>

            <Button
              onClick={() =>
                deleteMutation.mutate(
                  { id: todo.id },
                  {
                    onSuccess: () => {
                      trpcContext.todo.list.invalidate();
                    },
                  }
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </Button>
          </ListItem>
        );
      })}
    </UnorderedList>
  );
}
