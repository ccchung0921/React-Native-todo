import Navigator from "./navigation"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { NativeBaseProvider } from "native-base"

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigator />
      </NativeBaseProvider>
    </Provider>
  )
}
