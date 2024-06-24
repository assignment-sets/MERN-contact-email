import './App.css'
import { Routes, Route } from "react-router-dom"
import { Contact } from "./pages/GetPage.js"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Contact />}/>
    </Routes>
  )
}

export default App
