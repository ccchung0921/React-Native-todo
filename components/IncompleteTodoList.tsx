import React, { useMemo, useRef } from "react"
import { Text, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { selectIncompleteTodos } from "../redux/slices/todoSlice"
import { MemorizedTodoList } from "./TodoList"
import { styles } from "../constants/globalStyle"

const IncompleteTodoList = () => {
  const incompleteTodo = useSelector(selectIncompleteTodos)
  const totalIncompleteTodo = useMemo(() => {
    return incompleteTodo.length
  }, [incompleteTodo])

  const scrollRef = useRef<ScrollView | null>(null)

  return (
    <>
      <Text style={styles.sectionTitle}>
        INCOMPLETE: <Text style={{ fontWeight: "bold", color: "red" }}>{totalIncompleteTodo}</Text>
      </Text>
      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd()}
        style={styles.sectionScrollView}
      >
        <MemorizedTodoList todos={incompleteTodo} todoStatus="incompleted" />
      </ScrollView>
    </>
  )
}

export default IncompleteTodoList
