import "./App.css"
import Nav from "./components/Nav/Nav"
import Footer from "./components/Footer/Footer"
import { Toaster } from "react-hot-toast"
import { useLocation } from "react-router-dom"
import Router from "./routes/router"

// TODO: add typescript models

function App() {
  const location = useLocation()
  const bgDarkCheck = () => {
    const pathsToDarkBG = ["/dashbord", "/sign-in"]
    if (pathsToDarkBG.includes(location.pathname)) {
      return "bg-dark"
    }
  }

  return (
    <>
      <Nav />
      <main className={`main ${bgDarkCheck()}`}>
        <Router />
      </main>
      <Footer />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        // containerClassName=""
        // containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
          },
        }}
      />
    </>
  )
}

export default App
