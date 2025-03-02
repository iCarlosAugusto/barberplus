import './App.css'
import { ServicesPage } from './pages/ServicesPage'
import Navbar from './components/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ServicesPage />
      </div>
    </Router>
  )
}

export default App
