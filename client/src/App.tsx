import { useEffect } from "react"
import "./App.css"
import { useAuth } from "./hooks/auth"
import { persistor } from "./redux/store"
import Router from "./routes/router"

function App() {
  const user = useAuth()
  useEffect(() => {
    if (!user.rememberMe) {
      persistor.purge()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Router />
    </>
  )
}

export default App
