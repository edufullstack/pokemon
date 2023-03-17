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
  // const onSearch = (character) => {
  //   fetch(`https://rickandmortyapi.com/api/character/${character}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.name) {
  //         for (let character of characters) {
  //           if (data.id === character.id) {
  //             return window.alert('Ya tienes ese personaje')
  //           }
  //         }
  //         setCharacters((oldChars) => [...oldChars, data])
  //       } else {
  //         window.alert('No hay personajes con ese ID')
  //       }
  //     })
  // }

  return (
    <div className='App'>
      {location.pathname === '/' ? <LandingPage /> : <NavBar />}

      <Route exact path='/home' component={HomePage} />
      <Route exact path='/detail' component={DetailPage} />
      <Route exact path='/form' component={Form} />
      <Route exact path='/about' component={About} />
    </div>
  )
}

export default App
