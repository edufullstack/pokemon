import './App.css'
import LandingPage from './components/landingPage/LandingPage'
import { Switch, Route } from 'react-router-dom'
function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' element={<LandingPage />} />
      </Switch>
    </div>
  )
}

export default App
