import { Toaster } from "react-hot-toast"
import Footer from "../Footer/Footer"
import Nav from "../Nav/Nav"
import { Outlet, useLocation } from "react-router-dom"

export default function Layout() {
  const location = useLocation()
  const bgDarkCheck = () => {
    const pathsToDarkBG = ["/dashbord", "/sign-in"]
    if (pathsToDarkBG.includes(location.pathname)) {
      return "bg-dark"
    }
    return ""
  }
  return (
    <>
      <Nav />
      <main className={`main ${bgDarkCheck()}`}>
        <Outlet />
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
