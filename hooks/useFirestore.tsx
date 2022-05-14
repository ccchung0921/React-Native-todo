import { useEffect, useRef, useState } from "react"
import { db } from "../firebase"
import { setDoc, doc, getDocs, collectionGroup, deleteDoc, updateDoc } from "firebase/firestore"
import { Todo } from "../redux/slices/todoSlice"

// custom hook to interact with firebase
export const useFirestore = () => {
  const COLLECTION = "TODO"
  const isMountedRef = useRef(false)
  const [loading, setIsLoading] = useState(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const setLoading = (state: boolean) => {
    if (isMountedRef.current) {
      setIsLoading(state)
    }
  }

  const addTodoToDb = async (todo: Todo): Promise<void> => {
    const myDoc = doc(db, COLLECTION, todo.id)
    setLoading(true)
    try {
      await setDoc(myDoc, todo)
    } catch (error) {
      throw new Error(error)
    } finally {
      setLoading(false)
    }
  }

  const getTodos = async (): Promise<Todo[]> => {
    setLoading(true)
    try {
      const querySnapShot = await getDocs(collectionGroup(db, COLLECTION))
      const todos = querySnapShot.docs.map((doc) => doc.data() as Todo)
      return todos
    } catch (error) {
      throw new Error(error)
    } finally {
      setLoading(false)
    }
  }

  const removeTodoFromDb = async (id: string): Promise<void> => {
    try {
      const targetDoc = doc(db, COLLECTION, id)
      await deleteDoc(targetDoc)
    } catch (error) {
      throw new Error(error)
    }
  }

  const updateTodo = async (updatedTodo: Todo): Promise<void> => {
    try {
      const targetDoc = doc(db, COLLECTION, updatedTodo.id)
      await updateDoc(targetDoc, updatedTodo)
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    addTodoToDb,
    getTodos,
    removeTodoFromDb,
    updateTodo,
    isLoading: loading,
  }
}
