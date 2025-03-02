import "./App.css";
import { Routes, Route } from 'react-router-dom'
import Navbar from "@/components/Navbar";
import EmployeesPage from "@/pages/EmployeesPage";
import { ServicesPage } from "@/pages/ServicesPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ServicesPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
