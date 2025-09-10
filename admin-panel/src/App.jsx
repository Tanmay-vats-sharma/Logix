// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from './components/pages/AdminPanel';
function App() {
  

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<AdminPanel />} />
      </Routes>
      </Router>
    </>
  )
}

export default App
