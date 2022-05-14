import { createStackNavigator } from "@react-navigation/stack"
import TodoScreen from "../screens/TodoScreen"

export type TodoParamList = {
  todoScreen: undefined
}

const Stack = createStackNavigator<TodoParamList>()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="todoScreen" component={TodoScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigator
