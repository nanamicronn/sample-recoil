import { selector } from 'recoil'
import { textState, todoListFilterState, todoListState } from '@/atom'

export const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState)
    return text.length
  },
})

export const filteredTodoListState = selector({
  key: 'FilteredTodoList',
  get: ({ get }) => {
    const filter = get(todoListFilterState)
    const list = get(todoListState)

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete)
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete)
      default:
        return list
    }
  },
})
