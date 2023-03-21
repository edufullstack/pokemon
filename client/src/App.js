import './App.css'
import LandingPage from './components/landing/LandingPage'
import { Route, useLocation } from 'react-router-dom'
import HomePage from './components/homePage/HomePage'
import DetailPage from './components/detailPage/DetailPage'
import Form from './components/formPage/FormPage'
import About from './components/about/About'
import NavBar from './components/nav/NavBar'

function App() {
  const location = useLocation()

  return (
    <div className='App'>
      {location.pathname === '/' ? <LandingPage /> : <NavBar />}

      <Route path='/home' component={HomePage} />
      <Route path='/create' component={Form} />
      <Route path='/about' component={About} />
      <Route path='/detail/:detail' component={DetailPage} />
    </div>
  )
}

export default App
