import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BlogPage from './components/pages/blogPage/BlogPage';
function App() {

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center gap-3">
        <Router>
          <Routes>
            <Route path='/blog' element={<BlogPage />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
