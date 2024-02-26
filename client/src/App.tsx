import "./App.css"
import Nav from "./components/Nav/Nav"
// import Hero from "./components/Hero/Hero"
// import Features from "./components/Features/Features"
import Footer from "./components/Footer/Footer"
import User from "./pages/auth/User/User"
// import SignIn from "./pages/public/SignIn/SignIn"
function App() {
  return (
    <>
      {/* <header> */}
      <Nav />
      {/* </header> */}
      <main className="main bg-dark">
        {/* <Hero />
        <Features /> */}
        {/* <SignIn /> */}
        <User />
      </main>
      <Footer />
    </>
  )
}

export default App
