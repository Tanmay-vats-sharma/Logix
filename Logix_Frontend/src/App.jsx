import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPage from "./components/pages/blogPage/BlogPage";
import Header from "./components/common/Header"



// Layout component
function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center gap-3">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
