
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/home/Home'
import { Login } from './Components/Login'
import { Navbar } from './Components/navbar/Navbar'
import { SignUp } from './Components/Signup'
import { UrlShort } from './Components/urlShort/UrlShort'

function App() {
  

  return (
    <div >
      <Navbar/>
      
     
      
      <Routes>
        <Route path='' element={<Home/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={ <Login/>}></Route>
        <Route path='/url_short' element={ <UrlShort/>}></Route>
      </Routes>
    </div>
  )
}

export default App
