import {
  Button,
  Heading,
  ListItem,
  Paragraph,
  Spinner,
  UnorderedList,
  Pane,
  majorScale
} from 'evergreen-ui'
import { trpc } from 'lib/trpc'
import Center from 'components/CenterPage'

export default function ListTodos() {
  function handleDelete() {}
  function updateTodo() {}

  const response = trpc.todo.list.useQuery()
  const deleteMutation = trpc.todo.delete.useMutation()
  const updateMutation = trpc.todo.update.useMutation()
  const trpcContext = trpc.useContext()

  if (response.isError) {
    return <Heading>Error...</Heading>
  }

  if (response.isLoading) {
    return <Spinner />
  }

  return (
    <Center>
      <Heading>TODO</Heading>
      <Pane
        height="100%"
        maxWidth={majorScale(100)}
        padding={majorScale(2)}
      >
        {response.data.map((todo) => (
          <Pane key={todo.id}>
            <Paragraph>{todo.title}</Paragraph>
            <Button
              onClick={() =>
                updateMutation.mutate(
                  { id: todo.id, isCompleted: !todo.isCompleted },
                  { onSuccess: () => trpcContext.todo.list.invalidate() }
                )
              }
            >
              {todo.isCompleted ? 'Complete' : 'Incomplete'}
            </Button>
            <Button
              onClick={() =>
                deleteMutation.mutate(
                  { id: todo.id },
                  {
                    onSuccess: () => {
                      trpcContext.todo.list.invalidate()
                    }
                  }
                )
              }
            ></Button>
          </Pane>
        ))}
      </Pane>
    </Center>
  )
}
