// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from './components/pages/AdminPanel';
import AdminLogin from './components/pages/AdminLogin';
function App() {
  

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
      </Router>
    </>
  )
}

export default App
