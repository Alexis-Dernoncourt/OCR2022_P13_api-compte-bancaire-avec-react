import "react-loading-skeleton/dist/skeleton.css"
import { useLocation, useNavigate } from "react-router-dom"
import "./App.css"
import { history } from "./config"
import Router from "./routes/router"

function App() {
  // init custom history object to allow navigation from anywhere in the react app (inside or outside components)
  history.navigate = useNavigate()
  history.location = useLocation()
  return (
    <>
      <Router />
    </>
  )
}

export default App
