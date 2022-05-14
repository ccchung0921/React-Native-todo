import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface Todo {
  id: string
  todo: string
  completed: boolean
}

type todoState = {
  todos: Todo[]
}

interface newTodo {
  id: string
  todo: string
}

const initialState = { todos: [] } as todoState

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<newTodo>) => {
      const { id, todo } = action.payload
      state.todos.push({
        id,
        todo,
        completed: false,
      })
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      const todos = action.payload
      state.todos = todos
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload
      const targetTodo = state.todos.filter((todo) => todo.id === todoId)
      targetTodo[0].completed = true
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const todoId = action.payload
      state.todos = state.todos.filter((todo) => todo.id !== todoId)
    },
  },
})

// actions
export const { addTodo, setTodos, completeTodo, removeTodo } = slice.actions

// selectors
export const selectTodos = (state: RootState) => state.todo.todos
export const selectIncompleteTodos = (state: RootState) =>
  state.todo.todos.filter((todo) => !todo.completed)
export const selectCompleteTodos = (state: RootState) =>
  state.todo.todos.filter((todo) => todo.completed)

//reducer
export default slice.reducer
