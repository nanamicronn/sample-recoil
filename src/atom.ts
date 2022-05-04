import { atom } from 'recoil'
import { TodoList } from '@/types'

export const textState = atom({
  key: 'textState',
  default: '',
})

export const todoListState = atom<TodoList>({
  key: 'TodoList',
  default: [],
})
