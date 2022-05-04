export type TodoList = TodoListItem[]

export type TodoListItem = {
  id: number
  text: string
  isComplete: boolean
}

export type TodoFilterStatus = 'Show All' | 'Show Completed' | 'Show Uncompleted'
