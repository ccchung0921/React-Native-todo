import React, { memo } from "react"
import { Text, View, StyleSheet } from "react-native"
import { completeTodo, removeTodo, Todo } from "../redux/slices/todoSlice"
import { useDispatch } from "react-redux"
import Animated, { LightSpeedInLeft, LightSpeedOutRight, Layout } from "react-native-reanimated"
import { TouchableOpacity } from "react-native-gesture-handler"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { useFirestore } from "../hooks/useFirestore"
import { useToast } from "native-base"

interface TodoListProps {
  todos: Todo[]
  todoStatus: "completed" | "incompleted"
}

export const TodoList: React.FC<TodoListProps> = ({ todos, todoStatus }) => {
  const { removeTodoFromDb, updateTodo } = useFirestore()
  const toast = useToast()
  const dispatch = useDispatch()

  const handleCompleteTodo = async (todo: Todo) => {
    const cloneTodo = { ...todo }
    cloneTodo.completed = true
    await updateTodo(cloneTodo)
      .then(() => dispatch(completeTodo(cloneTodo.id)))
      .catch((error) => {
        console.error(error)
        toast.show({ description: "error occurs, please try", placement: 'top'})
      })
  }

  const handleDelete = async (id: string) => {
    await removeTodoFromDb(id)
      .then(() => dispatch(removeTodo(id)))
      .catch((error) => {
        console.error(error)
        toast.show({ description: "error occurs, please try", placement: 'top' })
      })
  }

  return (
    todos.length === 0 ?
    <View style={styles.emptyListContainer}>
      <Text style={styles.reminder}>
        {todoStatus === 'incompleted' && "Add to-do now 💪🏻"}
      </Text>
    </View>
    :
    <View style={styles.listContainer}>
      {
        todos.map((todo, i) => {
        return (
          <Animated.View
            key={todo.id}
            style={[styles.listView, { borderBottomWidth: i !== todos.length - 1 ? 0.3 : 0 }]}
            layout={Layout.springify()}
            entering={LightSpeedInLeft}
            exiting={LightSpeedOutRight}
          >
            <View style={styles.listHeadingSection}>
              {!!(todoStatus === "incompleted") && (
                <TouchableOpacity
                  hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                  onPress={() => handleCompleteTodo(todo)}
                >
                  <MaterialCommunityIcons name="sticker-check" size={24} color="green" />
                </TouchableOpacity>
              )}
              <Text style={{ marginLeft: 10 }}>{todo.todo}</Text>
            </View>
            <TouchableOpacity
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
              onPress={() => handleDelete(todo.id)}
            >
              <Ionicons name="md-trash-bin" size={24} color="red" />
            </TouchableOpacity>
          </Animated.View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 250,
  },
  reminder: {
    fontSize: 20,
    fontWeight:'bold'
  },
  listContainer: {
    borderRadius: 10,
    backgroundColor: "#F1E6BE",
    marginHorizontal: 5,
  },
  listView: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    borderBottomColor: "black",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listHeadingSection: {
    flexDirection: "row",
    alignItems: "center",
  },
})

// prevent rerender when parent component(TodoScreen) rerender (because of setText in TextInput)
export const MemorizedTodoList = memo(TodoList)
