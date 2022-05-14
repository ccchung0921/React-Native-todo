import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import StackNavigator from "./StackNavigator"

const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default Navigation
