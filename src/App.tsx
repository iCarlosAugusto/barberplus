import "./App.css";
import { Routes, Route, } from 'react-router-dom'
import Navbar from "@/components/Navbar";
import { ServicesPage } from "@/pages/ServicesPage";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ServicesPage />} />
        <Route path="/:barberSlug" element={<ServicesPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
