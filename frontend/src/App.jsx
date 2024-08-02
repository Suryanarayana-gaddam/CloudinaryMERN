import './App.css'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Nav/>
      <div className='min-h-screen'>
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}

export default App
