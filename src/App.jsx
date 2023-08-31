import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./components/HomePage"
import Update from "./components/Update"
import {ChakraProvider} from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import Signup from "./components/Signup"
import Login from "./components/Login"
import CreateRecord from "./components/CreateRecord"
import Footer from "./components/Footer"

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create" element={<CreateRecord/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
