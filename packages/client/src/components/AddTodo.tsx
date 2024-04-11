import { SetStateAction, useState } from 'react'
import trpc from 'lib/trpc'
import { Button, Pane, TextInput } from 'evergreen-ui'

export default function AddTodo() {
  const [title, setTitle] = useState('')
  const addTodoMutation = trpc.todo.create.useMutation()
  const trpcContext = trpc.useUtils()
  return (
    <Pane>
      <TextInput
        value={title}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setTitle(e.target.value)
        }
        type="text"
        placeholder="Get milk..."
      />
      <Button
        onClick={() => {
          addTodoMutation.mutate(
            { title: title },
            {
              onSuccess: () => {
                console.log('created a todo')
                trpcContext.todo.list.invalidate()
              }
            }
          )
        }}
      >
        Add todo
      </Button>
    </Pane>
  )
}
