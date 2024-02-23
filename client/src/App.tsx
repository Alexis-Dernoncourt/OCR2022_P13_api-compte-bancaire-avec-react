import "./App.css"
import Nav from "./components/Nav/Nav"
import Hero from "./components/Hero/Hero"
import Features from "./components/Features/Features"
import Footer from "./components/Footer/Footer"
function App() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  )
}

export default App
