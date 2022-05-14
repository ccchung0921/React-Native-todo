import * as React from "react"
import { Provider } from "react-redux"
import { fireEvent, render } from "@testing-library/react-native"
import { store } from "../redux/store"
import TodoScreen from "./TodoScreen"
import { Todo } from "../redux/slices/todoSlice"

const mockAddTodoToDb = jest.fn()
const mockGetTodos = jest.fn()

const mockedUseFirestore = {
  addTodoToDb: mockAddTodoToDb,
  getTodos: mockGetTodos,
  removeTodoFromDb: jest.fn(),
  updateTodo: jest.fn(),
}

// mock useFirebase hook
jest.mock("../hooks/useFirestore", () => ({
  useFirestore: jest.fn(() => mockedUseFirestore),
}))

describe("Todo test", () => {
  beforeEach(() => {
    // mock getTodos function
    mockGetTodos.mockImplementationOnce(
      (): Promise<Todo[]> =>
        Promise.resolve([
          {
            id: "abcdefg",
            todo: "Drink",
            completed: false,
          },
        ])
    )
    // mock addTodos function
    mockAddTodoToDb.mockImplementationOnce((): Promise<void> => Promise.resolve())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("adds a new todo", () => {
    const component = (
      <Provider store={store}>
        <TodoScreen />
      </Provider>
    )

    const { getByLabelText } = render(component)

    expect(mockGetTodos).toHaveBeenCalled()

    const input = getByLabelText("todo input")
    expect(input).toBeTruthy()

    const textToEnter = "Kick football"
    fireEvent.changeText(input, textToEnter)
    fireEvent.press(getByLabelText("submit"))
    expect(mockAddTodoToDb).toHaveBeenCalled()
  })
})
