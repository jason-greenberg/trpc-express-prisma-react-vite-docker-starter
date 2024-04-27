import { useState } from 'react'
import {
  Heading,
  Spinner,
  Pane,
  majorScale,
  toaster,
  TextInput,
  minorScale
} from 'evergreen-ui'
import { trpc } from 'lib/trpc'
import Center from 'components/CenterPage'
import ToDoItem from 'views/ToDo/ToDoItem'

export default () => {
  const [newTodo, setNewTodo] = useState('')
  const utils = trpc.useUtils()
  const invalidateTodos = utils.todo.list.invalidate

  const { data: todos, isError, isLoading } = trpc.todo.list.useQuery()
  const create = trpc.todo.create.useMutation({
    onSuccess: async () => await invalidateTodos()
  })

  const addItem = (title: string) => create.mutateAsync({ title })

  if (isError) {
    toaster.danger('Error fetching todo list. Please try again.')
    return (
      <Center>
        <Heading>Something went wrong.</Heading>
      </Center>
    )
  }

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  return (
    <Center background="tint1" justifyContent="flex-start">
      <Pane
        maxWidth={majorScale(200)}
        padding={majorScale(2)}
        minHeight={majorScale(40)}
      >
        <Heading
          size={800}
          fontWeight={500}
          textTransform="uppercase"
          textAlign="center"
          marginBottom={majorScale(1)}
        >
          Todo
        </Heading>
        {todos.map((todo) => {
          if (todo.isCompleted) return null
          return <ToDoItem todo={todo} />
        })}
        <Pane display="flex" width={majorScale(50)} justifyContent="center">
          <TextInput
            marginTop={majorScale(1)}
            width="100%"
            marginX={majorScale(2)}
            placeholder="Add item..."
            value={newTodo}
            onChange={(e: { currentTarget: { value: string } }) =>
              setNewTodo(e.currentTarget.value)
            }
            onKeyDown={async (e: {
              key: string
              currentTarget: { value: string }
            }) => {
              if (e.key === 'Enter') {
                await addItem(newTodo)
                setNewTodo('')
              }
            }}
          />
        </Pane>
      </Pane>
      <Pane
        display="flex"
        gap={majorScale(2)}
        justifyContent="space-between"
        width={majorScale(50)}
        marginTop={majorScale(3)}
      ></Pane>
      {todos.some((todo) => todo.isCompleted) && (
        <>
          <Heading
            size={800}
            fontWeight={500}
            textTransform="uppercase"
            textAlign="center"
            marginBottom={majorScale(1)}
          >
            Completed
          </Heading>
          {todos.map((todo) => {
            if (!todo.isCompleted) return null
            return <ToDoItem todo={todo} strikeThrough />
          })}
        </>
      )}
    </Center>
  )
}
