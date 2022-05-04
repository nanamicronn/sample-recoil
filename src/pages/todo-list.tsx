import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { todoListFilterState, todoListState } from '@/atom'
import { filteredTodoListState } from '@/selector'
import { TodoFilterStatus, TodoList, TodoListItem } from '@/types'

const TodoList: NextPage = () => {
  console.log('TodoList')
  const todoList = useRecoilValue(filteredTodoListState)

  return (
    <>
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  )
}

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState)
  const updateFilter = ({
    target: { value },
  }: ChangeEvent<{ value: TodoFilterStatus } & HTMLSelectElement>) => {
    setFilter(value)
  }
  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value='Show All'>All</option>
        <option value='Show Completed'>Completed</option>
        <option value='Show Uncompleted'>Uncompleted</option>
      </select>
    </>
  )
}

const TodoItemCreator = () => {
  console.log('TodoItemCreator')
  const [inputValue, setInputValue] = useState('')
  const setTodoList = useSetRecoilState(todoListState)

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ])
    setInputValue('')
  }

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value)
  }

  return (
    <div>
      <input type='text' value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  )
}

let id = 0
const getId = () => {
  return id++
}

const replaceItemAtIndex = (arr: TodoList, index: number, newValue: TodoListItem) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

const removeItemAtIndex = (arr: TodoList, index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

const TodoItem = ({ item }: { item: TodoListItem }) => {
  console.log('TodoItem')
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const index = todoList.findIndex((listItem) => listItem === item)

  const editItemText = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const newList = replaceItemAtIndex(todoList, index, { ...item, text: value })
    setTodoList(newList)
  }

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, { ...item, isComplete: !item.isComplete })
    setTodoList(newList)
  }

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index)
    setTodoList(newList)
  }

  return (
    <div>
      <input type='text' value={item.text} onChange={editItemText} />
      <input type='checkbox' checked={item.isComplete} onChange={toggleItemCompletion} />
      <button onClick={deleteItem}>X</button>
    </div>
  )
}

export default TodoList
