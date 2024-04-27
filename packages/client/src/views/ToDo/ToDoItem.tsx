import { RouterOutput, trpc } from 'lib/trpc'

import {
  Pane,
  Checkbox,
  majorScale,
  Paragraph,
  DeleteIcon,
  IconButton,
  PaneProps
} from 'evergreen-ui'

type Todo = RouterOutput['todo']['list'][number]

export interface ToDoItemProps extends PaneProps {
  todo: Todo
  strikeThrough?: boolean
}

const ToDoItem = ({ todo, strikeThrough, ...rest }: ToDoItemProps) => {
  const utils = trpc.useUtils()
  const invalidateTodos = utils.todo.list.invalidate

  const del = trpc.todo.delete.useMutation({
    onSuccess: () => invalidateTodos()
  })
  const update = trpc.todo.update.useMutation({
    onSuccess: () => invalidateTodos()
  })

  const toggleItem = (todo: Todo) =>
    update.mutate({
      id: todo.id,
      isCompleted: !todo.isCompleted
    })
  const deleteItem = (id: string) => del.mutate({ id })

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width={majorScale(50)}
      gap={majorScale(2)}
      paddingLeft={majorScale(2)}
      paddingRight={majorScale(1)}
      hoverElevation={0}
      {...rest}
    >
      <Pane display="flex" alignItems="center" gap={majorScale(2)}>
        <Checkbox
          onClick={() => toggleItem(todo)}
          checked={todo.isCompleted}
        ></Checkbox>
        <Paragraph
          fontWeight={300}
          {...(strikeThrough ? { textDecoration: 'line-through' } : {})}
        >
          {todo.title}
        </Paragraph>
      </Pane>
      <IconButton
        appearance="minimal"
        icon={<DeleteIcon color="muted" />}
        onClick={() => deleteItem(todo.id)}
      ></IconButton>
    </Pane>
  )
}

export default ToDoItem
