import { atom } from 'recoil'
import { TodoFilterStatus, TodoList } from '@/types'

export const textState = atom({
  key: 'textState',
  default: '',
})

export const todoListState = atom<TodoList>({
  key: 'TodoList',
  default: [],
})

export const todoListFilterState = atom<TodoFilterStatus>({
  key: 'TodoListFilter',
  default: 'Show All',
})
