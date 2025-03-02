import "./App.css";
import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import EmployeesPage from "./pages/EmployeesPage";
import { ServicesPage } from "./pages/ServicesPage";

// Vamos criar um componente Home básico para a página inicial
const Home = () => (
  <div>
    <h1>Página Inicial</h1>
    <p>Bem-vindo ao nosso sistema de agendamento!</p>
  </div>
);

// Componente para página não encontrada
const NotFound = () => (
  <div>
    <h1>404 - Página não encontrada</h1>
    <p>A página que você está procurando não existe.</p>
  </div>
);

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
