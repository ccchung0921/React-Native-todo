import "react-native-get-random-values"
import React, { useState, useEffect, useRef } from "react"
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { useDispatch } from "react-redux"
import { addTodo, setTodos } from "../redux/slices/todoSlice"
import { useFirestore } from "../hooks/useFirestore"
import { v4 as uuid } from "uuid"
import IncompleteTodoList from "../components/IncompleteTodoList"
import CompletedTodoList from "../components/CompletedTodoList"
import { Ionicons } from "@expo/vector-icons"
import { useToast } from "native-base"

const TodoScreen = () => {
  const toast = useToast()
  const ref = useRef<TextInput | null>(null)
  const { addTodoToDb, getTodos, isLoading } = useFirestore()
  const [todo, setTodo] = useState<string>("")
  const dispatch = useDispatch()

  useEffect(() => {
    getTodos()
      .then((todo) => dispatch(setTodos(todo)))
      .catch((error) => {
        console.error(error)
        toast.show({ description: "error occurs, please try", placement: "top" })
      })
  }, [])

  const handleTodoSubmit = () => {
    const newTodo = {
      id: uuid(),
      todo,
      completed: false,
    }
    addTodoToDb(newTodo)
      .then(() => {
        dispatch(
          addTodo({
            id: newTodo.id,
            todo: newTodo.todo,
          })
        )
      })
      .catch((error) => {
        console.error(error)
        toast.show({ description: "error occurs, please try", placement: "top" })
      })
      .finally(() => {
        ref.current?.clear()
        setTodo("")
      })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.pageTitle}>TODO LIST 📝</Text>
        <IncompleteTodoList />
        <CompletedTodoList />
        <View style={styles.inputSection}>
          <TextInput
            ref={ref}
            accessibilityLabel="todo input"
            placeholder="Add todo..."
            onChangeText={(text) => setTodo(text)}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <TouchableOpacity
                accessibilityLabel="submit"
                disabled={todo === ""}
                onPress={handleTodoSubmit}
              >
                <Ionicons name="ios-add-circle" size={40} color={todo === "" ? "gray" : "green"} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default TodoScreen

const styles = StyleSheet.create({
  pageTitle: {
    textAlign: "center",
    fontSize: 20,
  },
  inputSection: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonContainer: {
    flex: 0.2,
    alignItems: "center",
  },
})
