import React, { useMemo } from "react"
import { Text, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { selectCompleteTodos } from "../redux/slices/todoSlice"
import { MemorizedTodoList } from "./TodoList"
import { styles } from "../constants/globalStyle"

const CompletedTodoList = () => {
  const completedTodo = useSelector(selectCompleteTodos)
  const totalCompleteTodo = useMemo(() => {
    return completedTodo.length
  }, [completedTodo])

  return (
    <>
      <Text style={styles.sectionTitle}>
        COMPLETED: <Text style={{ fontWeight: "bold", color: "green" }}>{totalCompleteTodo}</Text>
      </Text>
      <ScrollView style={styles.sectionScrollView}>
        <MemorizedTodoList todos={completedTodo} todoStatus="completed" />
      </ScrollView>
    </>
  )
}

export default CompletedTodoList
